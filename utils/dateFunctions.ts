import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';



export const getFormatDistanceToNow = ( date: number | undefined ) => {
    if(date){
        const fromNow = formatDistanceToNow( date , { locale: es } );
        return `hace ${fromNow}`;
    }
    else{
        return ""
    }
}
export const getFormat = ( date: number | undefined ) => {
    if(date){
        const fromNow = format( date , "MM/dd/yyyy", { locale: es } );
        return ` ${fromNow}`;
    }
    else{
        return ""
    }
}
