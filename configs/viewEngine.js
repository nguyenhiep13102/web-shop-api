
import express from "express";
import path from "path";

const configViewEngine = (app) => {
    // Đảm bảo đường dẫn đúng
    app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
};

export default configViewEngine;
