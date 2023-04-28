import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';



export const getFormatDistanceToNow = ( date: number | undefined ) => {
    if(date){
        const fromNow = formatDistanceToNow( date, { locale: es } );
        return `hace ${fromNow}`;
    }
    else{
        return ""
    }
}
