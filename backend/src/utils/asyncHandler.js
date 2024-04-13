const asyncHandler = (handler) => async (req, res, next) => {
    try {
        await handler(req, res,next);
    } catch (error) {
       return res.status(500).json({ 
            success: false,
            message: error.message || "Internal Server Error"
         });
    }
};


export default asyncHandler;
