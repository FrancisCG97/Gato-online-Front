import { inject, Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { UsuarioService } from './usuario.service';
import { CrearSalaArgs } from '../interfaces/crearSala';
import { UnirseASalaArgs } from '../interfaces/unirseASala';
import { Subject } from 'rxjs';
import { SalaBackend } from '../interfaces/sala';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  server = io('localhost:3000', { autoConnect: false });
  usuarioService = inject(UsuarioService);

  actualizacionDeSala$ = new Subject<SalaBackend>();

  constructor() {
    this.server.on('connect', () => {});
    this.server.on('sala', (args) => {
      this.actualizacionDeSala$.next(args);
    });
    this.server.connect();
  }
}
