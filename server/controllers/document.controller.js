import mongoose from 'mongoose';
import * as dotenv from "dotenv";

import Document from "../mongodb/models/document.js"; 

const getAllDocuments = async (req, res) => {
    try {
        const data = await Document.find();
        res.status(200)
            .json(data);
    } catch (error) {
        console.log(error);
    };
};

const createDocument = async (req, res) => {
    try {
        console.log(req.body);
        const {title, description, documentType, downloadUrl} = req.body;

        const documentCreated = await Document.create({title, description, documentType, downloadUrl});
        res.status(200)
            .json(documentCreated);
    } catch (error) {
        res.status(500).json('Internal server error');
    }
};

const getSpecificDocument = async (req, res) => {
    try {
        console.log(req.body);
        const {id} = req.body;

        const documentFound = await Document.findById(id);

        res.status(200)
            .json(documentFound);

    } catch (error) {
        res.status(500).json('Internal server error');
    }
};

const updateDocument = async (req, res) => {
    try {
        console.log(req.body);
        const {id, title, description, documentType, downloadUrl} = req.body;

        const updateDocument = await Document.findByIdAndUpdate( id, {
            title,
            description,
            documentType,
            downloadUrl,
        },);

        res.status(200)
            .json(updateDocument);

    } catch (error) {
        res.status(500).json('Internal server error');
    }
};

export {
    getAllDocuments,
    createDocument,
    getSpecificDocument,
    updateDocument,
};