import HttpStatus from 'http-status-codes';
import * as notesService from '../services/notes.service';

/**
 * Controller to create a new notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNotes = async (req, res, next) => {
    try{
        const data = await notesService.newNotes(req.body);
        res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Notes created successfully'
    });
    }
    catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });
      }
};

/**
 * Controller to get all notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
    try{
        const data = await notesService.getNotes(req.body);
        res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Fetched All Notes Successfully'
        });
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
        });
    }
    };

/**
 * Controller to get a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getANote = async (req, res, next) => {
    try{
        const data = await notesService.getNote(req.params._id);
        res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Fetched Note Successfully'
        });
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
        });
    }
    };


/**
 * Controller to Update notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNotes = async(req, res, next) => {
    try{
        const data = await notesService.updateNotes(req.params._id,req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Updated Note Details Successfully'
            });
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
            });
    }
};

/**
 * Controller to Delete notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNotes = async(req, res, next) => {
    try{
        const deletedData = await notesService.deleteNotes(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: [],
            message: 'Deleted Note Successfully'
            });
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
            });
    }
};

