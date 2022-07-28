import { Controller, Get } from '@nestjs/common';

@Controller('/api/footer/texto')
export class TextoController {
  @Get()
  public getAllPost(): { message: string } {
    const min = Math.ceil(1);
    const max = Math.floor(5);
    const message = Math.floor(Math.random() * (max - min + 1)) + 1;
    if (message === 1) return { message: 'Conectado al 100%' };
    if (message === 2) return { message: 'Tu sistema es OK' };
    if (message === 3) return { message: 'Mucho exito (2022)' };
    if (message === 4)
      return { message: 'Has logrado tener una conexion con esta API' };
    return { message: 'Todos los sercicios en linea!!!' };
  }
}
