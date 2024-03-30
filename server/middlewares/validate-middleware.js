
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Information Improper";
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails
        }

        next(error);
    }

};

export default validate;