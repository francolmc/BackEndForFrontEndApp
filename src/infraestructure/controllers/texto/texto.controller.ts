import { Controller, Get } from '@nestjs/common';

@Controller('/api/footer/texto')
export class TextoController {
  @Get()
  public async getAllPost(): Promise<string> {
    const min = Math.ceil(1);
    const max = Math.floor(4);
    const message = Math.floor(Math.random() * (max - min + 1)) + 1;
    if (message === 1) return 'Conectado al 100%';
    if (message === 2) return 'Tu sistema es OK';
    if (message === 3) return 'Mucho exito (2022)';
    if (message === 4) return 'Has logrado tener una conexion con esta API';
    return 'Todos los sercicios en linea!!!';
  }
}
