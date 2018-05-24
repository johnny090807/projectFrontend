import {EventEmitter} from "@angular/core";
import {Error} from "./error.model";

export class ErrorService{
    errorOccurred = new EventEmitter<Error>();

    handleError(error:any){
        // set the error
        const errorData = new Error(error.title, error.error.message);
        // emit the error data
        this.errorOccurred.emit(errorData);
    }
}