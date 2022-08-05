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
        const data = await notesService.getNotes();
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

