import { Request, Response, NextFunction } from 'express';
import config from '../config';
import database from '../config/database';
import fs from 'fs';
const testFolder = 'mockdata';
const project = 'project.json';
import path from 'path';
import { MongoClient, ObjectId } from 'mongodb';
const dbName = config.mongoDbDatabase;
const client = new MongoClient(database.configMongodb);
const manageModule = {
    async manage(req: Request, res: Response) {
        try {
            const endpoint = req.query.endpoint;
            const fontendName = req.query.fontendName;
            const bodyParam = req.body;
            const jsonContent = JSON.stringify(bodyParam);
            fs.writeFileSync(
                `${testFolder}/${endpoint}${fontendName}.json`,
                jsonContent,
                'utf8',
            );
            res.send({
                status: 200,
                message: 'success',
            });
        } catch (error: any) {
            res.status(error.response.status).json(error.response.data);
        }
    },
    async readJson(req: any, res: any) {
        try {
            const endpoint = req.query.endpoint;
            const fontendName = req.query.fontendName;
            if (fs.existsSync(`${testFolder}/${endpoint}${fontendName}.json`)) {
                fs.readFile(
                    `${testFolder}/${endpoint}${fontendName}.json`,
                    'utf8',
                    (error, data) => {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        const jsonContent = JSON.parse(data);
                        res.json(jsonContent);
                    },
                );
            } else {
                res.send({
                    status: 400,
                    message: 'not exist endpiont',
                });
            }
        } catch (error: any) {
            res.status(error.response.status).json(error.response.data);
        }
    },
    async endpointList(req: any, res: any) {
        const filerList: string[] = [];

        fs.readdirSync(testFolder)
            .filter((file) => path.extname(file) === '.json')
            .map((file) => {
                console.log(file);
                filerList.push(file);
            });
        const fileNamesWithoutExtension = filerList.map((fileName) =>
            fileName.replace('.json', ''),
        );
        res.send({ endpoint: fileNamesWithoutExtension });
    },

    async department(req: any, res: any) {
        try {
            const testFolderr = req.query.fontendName;
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/department.json`,
                'utf-8',
            );
            await res.send({
                status: 200,
                message: 'success',
                department: JSON.parse(fileContent),
            });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    async createDepartment(req: any, res: any) {
        const result = Array.isArray(req.body);
        const body = req.body;
        const testFolderr = req.query.fontendName;
        if (result == false) {
            let data = [];
            if (fs.existsSync(`${testFolder}/${testFolderr}/department.json`)) {
                const fileContent = fs.readFileSync(
                    `${testFolder}/${testFolderr}/department.json`,
                    'utf-8',
                );
                data = JSON.parse(fileContent);
                const finalResult = Object.assign(
                    {
                        departmentId: data.length + 1,
                    },
                    req.body,
                );
                const newObject = finalResult;
                data.push(newObject);
                fs.writeFileSync(
                    `${testFolder}/${testFolderr}/department.json`,
                    JSON.stringify(data),
                );
                res.send({
                    status: 200,
                    message: 'success',
                    data: data,
                });
            }
        } else {
            let data = [];
            if (fs.existsSync(`${testFolder}/${testFolderr}/department.json`)) {
                const fileContent = fs.readFileSync(
                    `${testFolder}/${testFolderr}/department.json`,
                    'utf-8',
                );
                data = JSON.parse(fileContent);
                const count = data.length;
                const filteredNumbers = body.map((element: any, index: any) => {
                    // console.log(element);
                    const finalResult = Object.assign(
                        {
                            departmentId: index + 1 + count,
                        },
                        element,
                    );
                    return finalResult;
                });
                const newObject = filteredNumbers;
                // console.log(newObject);
                const mergedArr = [...data, ...newObject];
                fs.writeFileSync(
                    `${testFolder}/${testFolderr}/department.json`,
                    JSON.stringify(mergedArr),
                );
                res.send({
                    status: 200,
                    message: 'success',
                    data: mergedArr,
                });
            }
        }
    },
    //mongo
    async createDepartmentMongo(req: any, res: any) {
        try {
            await client.connect();
            const document = req.body;
            const fontendName = req.query.fontendName;
            const result = await client
                .db(dbName)
                .collection(`timesheet_department_${fontendName}`)
                .insertOne(document);
            console.log(result);
            if (result) {
                res.send({ status: 200, message: 'insert success' });
            } else {
                res.send({ status: 400, message: 'insert fail' });
            }
            res.send({ status: 200, message: 'insert success' });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async workingTimeMongo(req: any, res: any) {
        try {
            await client.connect();
            const document = req.body;
            const fontendName = req.query.fontendName;
            const result = await client
                .db(dbName)
                .collection(`timesheet_working_${fontendName}`)
                .insertOne(document);
            // console.log(result);
            if (result) {
                res.send({ status: 200, message: 'success', data: document });
            }
        } catch (err) {
            res.send(err);
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async createUserMongo(req: any, res: any) {
        try {
            await client.connect();
            const document = req.body;
            const fontendName = req.query.fontendName;
            const result = await client
                .db(dbName)
                .collection(`timesheet_user_${fontendName}`)
                .insertOne(document);
            res.send({ status: 200, message: 'insert success' });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async getDepartment(req: any, res: any) {
        try {
            const fontendName = req.query.fontendName;
            console.log(fontendName);
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_department_${fontendName}`);
            const result = await collection.find({}).toArray();
            res.send({ status: 200, message: 'success', data: result });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async getDepartmentByIdMongo(req: any, res: any) {
        try {
            const param = req.params.departmentId;
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_department_${fontendName}`);
            const query = { _id: new ObjectId(`${param}`) };
            const result = await collection.find(query).toArray();
            console.log(result);
            console.log('Retrieved documents:', result);
            res.send({ ststus: 200, message: 'success', data: result });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async getTimeSheetMongo(req: any, res: any) {
        try {
            const param = req.params.userId;
            // console.log(param);
            const fontendName = req.query.fontendName;
            await client.connect();

            const collectionUser = client
                .db(dbName)
                .collection(`timesheet_user_${fontendName}`);
            const user = await collectionUser.find().toArray();
            const userResult = JSON.parse(JSON.stringify(user));

            const collectionProject = client
                .db(dbName)
                .collection(`timesheet_project_${fontendName}`);
            const project = await collectionProject.find().toArray();
            const projectResult = JSON.parse(JSON.stringify(project));

            const collectionTask = client
                .db(dbName)
                .collection(`timesheet_task_${fontendName}`);
            const task = await collectionTask.find().toArray();
            const taskResult = JSON.parse(JSON.stringify(task));

            const collection = client
                .db(dbName)
                .collection(`timesheet_working_${fontendName}`);
            const query = { userId: param }; // Assuming the field name is "departmentId"
            const result = await collection.find(query).toArray();
            // const result = await collection.find().toArray();
            const data = result.map((element) => {
                // console.log(element);

                var taskData = taskResult.find(
                    (item: any) => item._id === element.taskId,
                );

                var projectData = projectResult.find(
                    (item: any) => item._id === element.projectId,
                );
                var resultt = userResult.find(
                    (item: any) => item._id === element.userId,
                );

                // console.log(taskData);
                const obj = Object.assign(
                    element,
                    { user: resultt },
                    { task: taskData },
                    { project: projectData },
                );
                return obj;
            });
            // console.log(data);
            // console.log('Retrieved documents:', result);
            res.send({ status: 200, message: 'success', data: data });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async getProjectByIdMongo(req: any, res: any) {
        try {
            const param = req.params.projectId;
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_project_${fontendName}`);
            const query = { _id: new ObjectId(`${param}`) };
            const result = await collection.find(query).toArray();
            console.log(result);
            console.log('Retrieved documents:', result);
            res.send({ ststus: 200, message: 'success', data: result });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },
    async updateDepartmentDB(req: any, res: any) {
        try {
            await client.connect();

            const fontendName = req.query.fontendName;
            const id = req.query.departmentId;
            const collection = client
                .db(dbName)
                .collection(`timesheet_department_${fontendName}`);
            const updateData = req.body;
            const query = { _id: new ObjectId(`${id}`) };
            const update = { $set: updateData };
            const result = await collection.updateOne(query, update);
            if (result.modifiedCount === 1) {
                console.log(result);
                console.log(
                    'Document updated successfully:',
                    result.modifiedCount,
                );
                res.send({ status: 200, message: result.modifiedCount });
            } else {
                res.send({ status: 400, message: result.modifiedCount });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },
    async deleteDepartmentDB(req: any, res: any) {
        try {
            const id = req.params.departmentId;
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_department_${fontendName}`);
            const query = { _id: new ObjectId(id) };
            const result = await collection.deleteOne(query);
            if (result.deletedCount === 1) {
                res.send({
                    status: 200,
                    message: 'Document deleted successfully',
                });
            } else {
                res.send({
                    ststus: 400,
                    message: 'No document found with the specified ID',
                });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async getUser(req: any, res: any) {
        try {
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_user_${fontendName}`);
            const result = await collection.find({}).toArray();
            res.send({ status: 200, message: 'success', data: result });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async deleteUserMongo(req: any, res: any) {
        try {
            const id = req.params.userId;
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_user_${fontendName}`);
            const query = { _id: new ObjectId(id) };
            const result = await collection.deleteOne(query);
            if (result.deletedCount === 1) {
                res.send({
                    status: 200,
                    message: 'Document deleted successfully',
                });
            } else {
                res.send({
                    ststus: 400,
                    message: 'No document found with the specified ID',
                });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },
    async updateUserMongo(req: any, res: any) {
        try {
            await client.connect();
            const fontendName = req.query.fontendName;
            const id = req.query.userId;
            const collection = client
                .db(dbName)
                .collection(`timesheet_user_${fontendName}`);
            const updateData = req.body;
            const query = { _id: new ObjectId(`${id}`) };
            const update = { $set: updateData };
            const result = await collection.updateOne(query, update);
            if (result.modifiedCount === 1) {
                console.log(result);
                console.log(
                    'Document updated successfully:',
                    result.modifiedCount,
                );
                res.send({ status: 200, message: result.modifiedCount });
            } else {
                res.send({ status: 400, message: result.modifiedCount });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },
    async searchUserMongo(req: any, res: any) {
        try {
            const param = req.query.keyword;
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_user_${fontendName}`);
            const query = { firstname: { $regex: param, $options: 'i' } }; // Assuming the field name is "departmentId"
            const result = await collection.find(query).toArray();
            console.log(result);
            console.log('Retrieved documents:', result);
            res.send({ status: 200, message: 'success', data: result });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async userLoginMongo(req: any, res: any) {
        try {
            const { username, password } = req.body;
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_user_${fontendName}`);
            const query = { username: username, password: password };
            const result = await collection.findOne(query);
            if (result) {
                res.send({
                    status: 200,
                    message: 'Authentication successful',
                    data: result,
                });
            } else {
                res.send({ status: 401, message: 'Authentication failed' });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async getTaskMongo(req: any, res: any) {
        try {
            await client.connect();
            const fontendName = req.query.fontendName;
            const collection = client
                .db(dbName)
                .collection(`timesheet_task_${fontendName}`);
            const result = await collection.find({}).toArray();
            res.send({ status: 200, message: 'success', data: result });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },
    async getProjectMongo(req: any, res: any) {
        try {
            await client.connect();
            const fontendName = req.query.fontendName;
            const collection = client
                .db(dbName)
                .collection(`timesheet_project_${fontendName}`);
            const result = await collection.find({}).toArray();

            const user = client
                .db(dbName)
                .collection(`timesheet_user_${fontendName}`);

            const userData = await user.find().toArray();
            const userResult = JSON.parse(JSON.stringify(userData));

            const data = result.map((element) => {
                // console.log(element);

                var userData = userResult.find(
                    (item: any) => item._id === element.projectOwner,
                );

                // console.log(taskData);
                const obj = Object.assign(element, { user: userData });
                return obj;
            });
            // console.log(data);
            // console.log('Retrieved documents:', result);
            if (fontendName == 'brand') {
                res.send({ status: 200, message: 'success', data: data });
            } else if (fontendName == 'berm' || fontendName == 'bumb') {
                res.send({ status: 200, message: 'success', data: result });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async createTaskTypeMongo(req: any, res: any) {
        try {
            await client.connect();
            const document = req.body;
            const fontendName = req.query.fontendName;
            const result = await client
                .db(dbName)
                .collection(`timesheet_task_${fontendName}`)
                .insertOne(document);
            res.send({ status: 200, message: 'insert success' });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async deleteTaskMongo(req: any, res: any) {
        try {
            const id = req.params.taskId;
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_task_${fontendName}`);
            const query = { _id: new ObjectId(id) };
            const result = await collection.deleteOne(query);
            if (result.deletedCount === 1) {
                res.send({
                    status: 200,
                    message: 'Document deleted successfully',
                });
            } else {
                res.send({
                    ststus: 400,
                    message: 'No document found with the specified ID',
                });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async createProjectMongo(req: any, res: any) {
        try {
            await client.connect();
            const document = req.body;
            const fontendName = req.query.fontendName;
            const result = await client
                .db(dbName)
                .collection(`timesheet_project_${fontendName}`)
                .insertOne(document);
            res.send({ status: 200, message: 'insert success' });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },
    async deleteProjectMongo(req: any, res: any) {
        try {
            const id = req.params.projectId;
            const fontendName = req.query.fontendName;
            await client.connect();
            const collection = client
                .db(dbName)
                .collection(`timesheet_project_${fontendName}`);
            const query = { _id: new ObjectId(id) };
            const result = await collection.deleteOne(query);
            if (result.deletedCount === 1) {
                res.send({
                    status: 200,
                    message: 'Document deleted successfully',
                });
            } else {
                res.send({
                    ststus: 400,
                    message: 'No document found with the specified ID',
                });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async updateProjectMongo(req: any, res: any) {
        try {
            await client.connect();
            const fontendName = req.query.fontendName;
            // console.log(fontendName);
            const id = req.query.projectId;
            const collection = client
                .db(dbName)
                .collection(`timesheet_project_${fontendName}`);
            const updateData = req.body;
            console.log(id);
            console.log(updateData);
            const query = { _id: new ObjectId(id) };
            // console.log(query);
            const update = { $set: updateData };
            const result = await collection.updateOne(query, update);

            console.log(result);
            if (result.modifiedCount === 1) {
                console.log(result);
                console.log(
                    'Document updated successfully:',
                    result.modifiedCount,
                );
                res.send({ status: 200, message: result.modifiedCount });
            } else {
                res.send({ status: 400, message: result.modifiedCount });
            }
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        } finally {
            await client.close();
        }
    },

    async getTask(req: any, res: any) {
        try {
            const testFolderr = req.query.fontendName;
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/task.json`,
                'utf-8',
            );
            await res.send({
                status: 200,
                message: 'success',
                project: JSON.parse(fileContent),
            });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    async getProject(req: any, res: any) {
        try {
            const testFolderr = req.query.fontendName;
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/${project}`,
                'utf-8',
            );
            await res.send({
                status: 200,
                message: 'success',
                project: JSON.parse(fileContent),
            });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    async createProject(req: Request, res: Response) {
        try {
            const result = Array.isArray(req.body);
            const body = req.body;
            const testFolderr = req.query.fontendName;
            if (result == false) {
                let data = [];
                if (
                    fs.existsSync(`${testFolder}/${testFolderr}/project.json`)
                ) {
                    const fileContent = fs.readFileSync(
                        `${testFolder}/${testFolderr}/project.json`,
                        'utf-8',
                    );
                    data = JSON.parse(fileContent);
                    const finalResult = Object.assign(
                        {
                            projectId: data.length + 1,
                        },
                        req.body,
                    );
                    const newObject = finalResult;
                    data.push(newObject);
                    fs.writeFileSync(
                        `${testFolder}/${testFolderr}/project.json`,
                        JSON.stringify(data),
                    );
                    res.send({
                        status: 200,
                        message: 'success',
                        data: data,
                    });
                }
            } else {
                let data = [];
                if (
                    fs.existsSync(`${testFolder}/${testFolderr}/project.json`)
                ) {
                    const fileContent = fs.readFileSync(
                        `${testFolder}/${testFolderr}/project.json`,
                        'utf-8',
                    );
                    data = JSON.parse(fileContent);
                    const count = data.length;
                    const filteredNumbers = body.map(
                        (element: any, index: any) => {
                            // console.log(element);
                            const finalResult = Object.assign(
                                {
                                    projectId: index + 1 + count,
                                },
                                element,
                            );
                            return finalResult;
                        },
                    );
                    const newObject = filteredNumbers;
                    // console.log(newObject);
                    const mergedArr = [...data, ...newObject];
                    fs.writeFileSync(
                        `${testFolder}/${testFolderr}/project.json`,
                        JSON.stringify(mergedArr),
                    );
                    res.send({
                        status: 200,
                        message: 'success',
                        data: mergedArr,
                    });
                }
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }
    },

    async getDepartmentById(req: Request, res: Response) {
        const testFolderr = req.query.fontendName;
        const param = req.params.departmentId;
        let data = [];

        const fileContent = fs.readFileSync(
            `${testFolder}/${testFolderr}/department.json`,
            'utf-8',
        );
        data = JSON.parse(fileContent);
        const result = data.find(function (item: any) {
            return item.departmentId == parseInt(param);
        });
        if (result) {
            res.send({
                status: 200,
                messge: 'success',
                data: result,
            });
        } else {
            res.send({
                status: 200,
                messge: 'success',
                data: 'no data',
            });
        }
    },

    async getProjectById(req: Request, res: Response) {
        const param = req.params.projectId;
        let data = [];
        const testFolderr = 'berm';
        const fileContent = fs.readFileSync(
            `${testFolder}/${testFolderr}/${project}`,
            'utf-8',
        );
        data = JSON.parse(fileContent);
        const result = data.find(function (item: any) {
            return item.project_id == param;
        });
        if (result) {
            res.send({
                status: 200,
                messge: 'success',
                data: result,
            });
        } else {
            res.send({
                status: 200,
                messge: 'success',
                data: 'no data',
            });
        }
    },

    async getTimeSheet(req: Request, res: Response) {
        const param = req.params.userId;
        let data = [];
        const testFolderr = req.query.fontendName;
        const fileContent = fs.readFileSync(
            `${testFolder}/${testFolderr}/workingtime.json`,
            'utf-8',
        );

        data = JSON.parse(fileContent);
        const result = data.filter((obj: any) => {
            return obj.userId == parseInt(param);
        });
        const resultData = result.map((x: any, index: any) => {
            console.log(x.projectId);
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/${project}`,
                'utf-8',
            );
            data = JSON.parse(fileContent);
            const projectName = data.find(function (item: any) {
                return item.projectId == x.projectId;
            });
            console.log(x);
            console.log(projectName);

            if (testFolderr == 'berm') {
                let dataDepartment = [];
                const fileContentDepartment = fs.readFileSync(
                    `${testFolder}/${testFolderr}/department.json`,
                    'utf-8',
                );
                dataDepartment = JSON.parse(fileContentDepartment);
                const resultDepartment = dataDepartment.find(function (
                    item: any,
                ) {
                    return item.departmentId == parseInt(x.taskId);
                });
                let userDD = [];
                const userData = fs.readFileSync(
                    `${testFolder}/${testFolderr}/user.json`,
                    'utf-8',
                );
                userDD = JSON.parse(userData);
                const userResult = userDD.find(function (item: any) {
                    return item.userId == parseInt(x.userId);
                });
                const obj = {
                    ...projectName,
                    ...x,
                    ...resultDepartment,
                    ...userResult,
                };
                return obj;
            } else {
                let task = [];
                const fileContentTask = fs.readFileSync(
                    `${testFolder}/${testFolderr}/task.json`,
                    'utf-8',
                );
                task = JSON.parse(fileContentTask);
                const resultTask = task.find(function (item: any) {
                    return item.taskId == parseInt(x.taskId);
                });
                let userDD = [];
                const userData = fs.readFileSync(
                    `${testFolder}/${testFolderr}/user.json`,
                    'utf-8',
                );
                userDD = JSON.parse(userData);
                const userResult = userDD.find(function (item: any) {
                    return item.userId == parseInt(x.userId);
                });
                const obj = {
                    ...projectName,
                    ...x,
                    ...resultTask,
                    ...userResult,
                };
                return obj;
            }
        });

        if (result) {
            res.send({
                status: 200,
                messge: 'success',
                data: resultData,
            });
        } else {
            res.send({
                status: 200,
                messge: 'success',
                data: 'no data',
            });
        }
    },
    async getTimeSheetByProject(req: Request, res: Response) {
        const param = req.params.projectId;
        let data = [];
        const testFolderr = req.query.fontendName;
        const fileContent = fs.readFileSync(
            `${testFolder}/${testFolderr}/workingtime.json`,
            'utf-8',
        );
        data = JSON.parse(fileContent);
        // console.log(data);
        const result = data.filter((obj: any) => {
            return obj.projectId === parseInt(param);
        });
        // console.log(result);
        if (result) {
            res.send({
                status: 200,
                messge: 'success',
                data: result,
            });
        } else {
            res.send({
                status: 200,
                messge: 'success',
                data: 'no data',
            });
        }
    },

    async updateUser(req: any, res: any) {
        const userId = req.query.userId;
        const testFolderr = req.query.fontendName;
        let data = [];
        const fileContent = fs.readFileSync(
            `${testFolder}/${testFolderr}/user.json`,
            'utf-8',
        );
        data = JSON.parse(fileContent);
        const itemIdToUpdate = parseInt(userId);
        const newItemValue = Object.assign(
            {
                userId: itemIdToUpdate,
            },
            req.body,
        );
        const index = data.findIndex(
            (item: any) => item.project_id === itemIdToUpdate,
        );
        if (index !== -1) {
            data[index] = newItemValue;
            fs.writeFileSync(
                `${testFolder}/${testFolderr}/user.json`,
                JSON.stringify(data),
            );
            res.send({
                status: 200,
                message: 'update user data success',
                data,
            });
        } else {
            console.log('Object not found!');
            res.send({
                status: 200,
                message: 'no find project',
            });
        }
    },

    async updateProject(req: any, res: any) {
        const projectId = req.query.projectId;
        const testFolderr = 'berm';
        let data = [];
        const fileContent = fs.readFileSync(
            `${testFolder}/${testFolderr}/${project}`,
            'utf-8',
        );
        data = JSON.parse(fileContent);
        const itemIdToUpdate = parseInt(projectId);
        const newItemValue = Object.assign(
            {
                project_id: itemIdToUpdate,
            },
            req.body,
        );
        const index = data.findIndex(
            (item: any) => item.project_id === itemIdToUpdate,
        );
        if (index !== -1) {
            data[index] = newItemValue;
            fs.writeFileSync(
                `${testFolder}/${testFolderr}/${project}`,
                JSON.stringify(data),
            );
            res.send({
                status: 200,
                message: 'update project data success',
                data,
            });
        } else {
            console.log('Object not found!');
            res.send({
                status: 200,
                message: 'no find project',
            });
        }
    },
    async updateDepartment(req: any, res: any) {
        const departmentId = req.query.departmentId;
        console.log(departmentId);
        console.log(req.body);
        const testFolderr = req.query.fontendName;
        let data = [];
        const fileContent = fs.readFileSync(
            `${testFolder}/${testFolderr}/department.json`,
            'utf-8',
        );
        data = JSON.parse(fileContent);

        const newItemValue = Object.assign(
            {
                departmentId: parseInt(departmentId),
            },
            req.body,
        );
        const index = data.findIndex(
            (item: any) => item.departmentId == parseInt(departmentId),
        );
        if (index !== -1) {
            data[index] = newItemValue;
            fs.writeFileSync(
                `${testFolder}/${testFolderr}/department.json`,
                JSON.stringify(data),
            );
            res.send({
                status: 200,
                message: 'update project data success',
                data,
            });
        } else {
            console.log('Object not found!');
            res.send({
                status: 200,
                message: 'no find project',
            });
        }
    },

    async userLogin(req: any, res: any) {
        const { username, password } = req.body;
        const testFolderr = req.query.fontendName;
        let data = [];
        const fileContent = fs.readFileSync(
            `${testFolder}/${testFolderr}/user.json`,
            'utf-8',
        );
        data = JSON.parse(fileContent);
        const user = data.find(
            (item: any) =>
                item.username === username && item.password === password,
        );
        if (user) {
            const result = {
                user_id: user.user_id,
                username: user.username,
                department: user.department,
            };
            res.send({
                status: 200,
                message: 'success',
                data: user,
            });
        } else {
            res.send({
                status: 200,
                message: 'username not exist',
            });
        }
    },

    async createTaskType(req: any, res: any) {
        try {
            const result = Array.isArray(req.body);
            const body = req.body;
            const testFolderr = req.query.fontendName;
            if (result == false) {
                let data = [];
                if (fs.existsSync(`${testFolder}/${testFolderr}/task.json`)) {
                    const fileContent = fs.readFileSync(
                        `${testFolder}/${testFolderr}/task.json`,
                        'utf-8',
                    );
                    data = JSON.parse(fileContent);
                    const finalResult = Object.assign(
                        {
                            taskId: data.length + 1,
                        },
                        req.body,
                    );
                    const newObject = finalResult;
                    data.push(newObject);
                    fs.writeFileSync(
                        `${testFolder}/${testFolderr}/task.json`,
                        JSON.stringify(data),
                    );
                    res.send({
                        status: 200,
                        message: 'success',
                        data: data,
                    });
                } else {
                    data = [];
                    const finalResult = Object.assign(
                        {
                            taskId: data.length + 1,
                        },
                        req.body,
                    );
                    const newObject = finalResult;
                    data.push(newObject);
                    fs.writeFileSync(
                        `${testFolder}/${testFolderr}/task.json`,
                        JSON.stringify(data),
                    );
                    res.send({
                        status: 200,
                        message: 'success',
                        data: data,
                    });
                }
            } else {
                let data = [];
                if (fs.existsSync(`${testFolder}/${testFolderr}/task.json`)) {
                    const fileContent = fs.readFileSync(
                        `${testFolder}/${testFolderr}/task.json`,
                        'utf-8',
                    );
                    data = JSON.parse(fileContent);
                    const count = data.length;
                    const filteredNumbers = body.map(
                        (element: any, index: any) => {
                            // console.log(element);
                            const finalResult = Object.assign(
                                {
                                    taskId: index + 1 + count,
                                },
                                element,
                            );
                            return finalResult;
                        },
                    );
                    const newObject = filteredNumbers;
                    // console.log(newObject);
                    const mergedArr = [...data, ...newObject];
                    fs.writeFileSync(
                        `${testFolder}/${testFolderr}/task.json`,
                        JSON.stringify(mergedArr),
                    );
                    res.send({
                        status: 200,
                        message: 'success',
                        data: mergedArr,
                    });
                }
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }
    },
    async deleteTask(req: any, res: any) {
        const taskId = req.params.taskId;
        console.log(taskId);
        const testFolderr = req.query.fontendName;
        let data = [];
        if (fs.existsSync(`${testFolder}/${testFolderr}/task.json`)) {
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/task.json`,
                'utf-8',
            );
            data = JSON.parse(fileContent);
            const indexOfObject = data.findIndex((object: any) => {
                console.log(object);
                return object.taskId == parseInt(taskId);
            });
            data.splice(indexOfObject, 1);
            fs.writeFileSync(
                `${testFolder}/${testFolderr}/task.json`,
                JSON.stringify(data),
            );
            res.send({
                status: 200,
                message: 'success',
                data: `remove taskId ${taskId} success`,
            });
        }
    },

    async deleteWorkingTime(req: any, res: any) {
        const id = req.params.id;
        console.log(id);
        const testFolderr = req.query.fontendName;
        let data = [];
        if (fs.existsSync(`${testFolder}/${testFolderr}/workingtime.json`)) {
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/workingtime.json`,
                'utf-8',
            );
            data = JSON.parse(fileContent);
            const indexOfObject = data.findIndex((object: any) => {
                console.log(object);
                return object.id == parseInt(id);
            });
            data.splice(indexOfObject, 1);
            fs.writeFileSync(
                `${testFolder}/${testFolderr}/workingtime.json`,
                JSON.stringify(data),
            );
            res.send({
                status: 200,
                message: 'success',
                data: `remove taskId ${id} success`,
            });
        }
    },

    async create(req: any, res: any) {
        try {
            const testFolderr = req.query.fontendName;
            const result = Array.isArray(req.body);
            const body = req.body;

            if (result == false) {
                let data = [];
                if (fs.existsSync(`${testFolder}/${testFolderr}/user.json`)) {
                    const fileContent = fs.readFileSync(
                        `${testFolder}/${testFolderr}/user.json`,
                        'utf-8',
                    );
                    data = JSON.parse(fileContent);
                    const finalResult = Object.assign(
                        {
                            userId: data.length + 1,
                        },
                        req.body,
                    );
                    const newObject = finalResult;
                    data.push(newObject);
                    fs.writeFileSync(
                        `${testFolder}/${testFolderr}/user.json`,
                        JSON.stringify(data),
                    );
                    res.send({
                        status: 200,
                        message: 'success',
                        data: data,
                    });
                }
            } else {
                let data = [];
                if (fs.existsSync(`${testFolder}/${testFolderr}/user.json`)) {
                    const fileContent = fs.readFileSync(
                        `${testFolder}/${testFolderr}/user.json`,
                        'utf-8',
                    );
                    data = JSON.parse(fileContent);
                    const count = data.length;
                    const filteredNumbers = body.map(
                        (element: any, index: any) => {
                            // console.log(element);
                            const finalResult = Object.assign(
                                {
                                    userId: index + 1 + count,
                                },
                                element,
                            );
                            return finalResult;
                        },
                    );
                    const newObject = filteredNumbers;
                    // console.log(newObject);
                    const mergedArr = [...data, ...newObject];
                    fs.writeFileSync(
                        `${testFolder}/${testFolderr}/user.json`,
                        JSON.stringify(mergedArr),
                    );
                    res.send({
                        status: 200,
                        message: 'success',
                        data: mergedArr,
                    });
                }
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }
    },

    async deleteUser(req: any, res: any) {
        const userId = req.params.userId;
        console.log(userId);
        const testFolderr = req.query.fontendName;
        let data = [];
        if (fs.existsSync(`${testFolder}/${testFolderr}/user.json`)) {
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/user.json`,
                'utf-8',
            );
            data = JSON.parse(fileContent);
            const indexOfObject = data.findIndex((object: any) => {
                console.log(object);
                return object.userId == parseInt(userId);
            });
            data.splice(indexOfObject, 1);
            fs.writeFileSync(
                `${testFolder}/${testFolderr}/user.json`,
                JSON.stringify(data),
            );
            res.send({
                status: 200,
                message: 'success',
                data: `remove userId ${userId} success`,
            });
        }
    },

    async deleteDepartment(req: any, res: any) {
        const departmentId = req.params.departmentId;
        console.log(departmentId);
        const testFolderr = req.query.fontendName;
        let data = [];
        if (fs.existsSync(`${testFolder}/${testFolderr}/department.json`)) {
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/department.json`,
                'utf-8',
            );
            data = JSON.parse(fileContent);
            const indexOfObject = data.findIndex((object: any) => {
                console.log(object);
                return object.departmentId == parseInt(departmentId);
            });
            data.splice(indexOfObject, 1);
            fs.writeFileSync(
                `${testFolder}/${testFolderr}/department.json`,
                JSON.stringify(data),
            );
            res.send({
                status: 200,
                message: 'success',
                data: `remove departmentId ${departmentId} success`,
            });
        }
    },

    async deleteProject(req: any, res: any) {
        const projectId = req.params.projectId;
        console.log(projectId);
        const testFolderr = req.query.fontendName;
        let data = [];
        if (fs.existsSync(`${testFolder}/${testFolderr}/project.json`)) {
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/project.json`,
                'utf-8',
            );
            data = JSON.parse(fileContent);
            // No such element with ID of 9
            const objWithIdIndex = data.findIndex(
                (obj: any) => obj.projectId === parseInt(projectId),
            );
            data.splice(objWithIdIndex, 1);
            fs.writeFileSync(
                `${testFolder}/${testFolderr}/project.json`,
                JSON.stringify(data),
            );
            res.send({
                status: 200,
                message: 'success',
                data: `remove project ${projectId} success`,
            });
        }
    },
    async teamProject(req: any, res: any) {
        const testFolderr = req.query.fontendName;
        const projectId = req.params.projectId;
        let data = [];
        if (fs.existsSync(`${testFolder}/${testFolderr}/teamproject.json`)) {
            const fileContent = fs.readFileSync(
                `${testFolder}/${testFolderr}/teamproject.json`,
                'utf-8',
            );
            data = JSON.parse(fileContent);
            const user = data.find(
                (item: any) => item.project_id == parseInt(projectId),
            );
            if (user) {
                res.send(user);
            } else {
                res.send({
                    status: 200,
                    message: 'this project id no have data',
                });
            }
        }
    },
    async getAllUser(req: Request, res: Response) {
        try {
            let data = [];
            const testFolderr = req.query.fontendName;
            if (fs.existsSync(`${testFolder}/${testFolderr}/user.json`)) {
                const fileContent = fs.readFileSync(
                    `${testFolder}/${testFolderr}/user.json`,
                    'utf-8',
                );
                data = JSON.parse(fileContent);
            }
            res.send({ status: 200, message: 'success', data: data });
        } catch (error) {
            console.error('Error reading file:', error);
        }
    },
    async searchUser(req: any, res: any) {
        try {
            const testFolderr = req.query.fontendName;
            const keyword = req.query.keyword;
            let data = [];
            if (fs.existsSync(`${testFolder}/${testFolderr}/user.json`)) {
                const fileContent = fs.readFileSync(
                    `${testFolder}/${testFolderr}/user.json`,
                    'utf-8',
                );
                data = JSON.parse(fileContent);
                const result = data.filter((obj: any) =>
                    String(obj.username).includes(keyword),
                );
                res.send(result);
                // res.status(200).send({
                //     status: 200,
                //     message: 'success',
                //     data: result,
                // });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    async workingTime(req: any, res: any) {
        try {
            const testFolderr = req.query.fontendName;
            let data = [];
            if (
                fs.existsSync(`${testFolder}/${testFolderr}/workingtime.json`)
            ) {
                const fileContent = fs.readFileSync(
                    `${testFolder}/${testFolderr}/workingtime.json`,
                    'utf-8',
                );
                data = JSON.parse(fileContent);
                const finalResult = Object.assign(
                    {
                        id: data.length + 1,
                    },
                    req.body,
                );
                const newObject = finalResult;
                data.push(newObject);
                fs.writeFileSync(
                    `${testFolder}/${testFolderr}/workingtime.json`,
                    JSON.stringify(data),
                );
                res.send({
                    status: 200,
                    message: 'success',
                    data: data,
                });
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }
    },
    async workingTimeSecond(req: any, res: any) {
        try {
            const testFolderr = req.query.fontendName;
            let data = [];
            if (
                fs.existsSync(
                    `${testFolder}/${testFolderr}/workingtimesecond.json`,
                )
            ) {
                const fileContent = fs.readFileSync(
                    `${testFolder}/${testFolderr}/workingtimesecond.json`,
                    'utf-8',
                );
                data = JSON.parse(fileContent);
                const finalResult = Object.assign(
                    {
                        id: data.length + 1,
                    },
                    req.body,
                );
                const newObject = finalResult;
                data.push(newObject);
                fs.writeFileSync(
                    `${testFolder}/${testFolderr}/workingtimesecond.json`,
                    JSON.stringify(data),
                );
                res.send({
                    status: 200,
                    message: 'success',
                    data: data,
                });
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }
    },
    async self_report(req: any, res: any) {
        res.send({ xxx: 'sss' });
    },
    async pm_report(req: any, res: any) {
        res.send({ xxx: 'sss' });
    },
};
export default manageModule;
