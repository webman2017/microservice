const meta = (summary: any, tags: any) => {
    return {
        swagger: {
            summary: summary,
            tags: [tags],
        },
    };
};
export default meta;
