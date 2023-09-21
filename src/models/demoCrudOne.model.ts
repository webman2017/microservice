import { model, Schema, Model, Document } from 'mongoose';
import IDemoCrudOne from '../interfaces/demoCrudOne.interface';

interface IModelDemoCrudOne extends IDemoCrudOne, Document {}

const DemoCrudOneSchema: Schema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
});

const DemoCrudOne = (Model<IModelDemoCrudOne> = model(
    'DemoCrudOne',
    DemoCrudOneSchema,
    'md_demo_crud_one',
));

export { DemoCrudOne, IModelDemoCrudOne };
