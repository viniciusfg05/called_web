
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br.js'
import utc from 'dayjs/plugin/utc.js'; // Importa o plugin para manipulação de UTC

export function formattedDateCut(date: string) {
    // Configura o idioma para pt-br
    dayjs.locale('pt-br');
  
    // Formata a data para "DD de MMM"
    const formatted = dayjs(date).format('DD [de] MMM h:mm A')
  
    return formatted;
  }