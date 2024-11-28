import { Component, inject, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { CrearSalaArgs } from '../../interfaces/crearSala';
import { UsuarioService } from '../../services/usuario.service';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { DetallePartidaComponent } from '../../components/detalle-partida/detalle-partida.component';
import { SalaService } from '../../services/sala.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-jugar',
  standalone: true,
  imports: [RouterModule, TableroComponent, DetallePartidaComponent],
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '2s ease-in',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate(
          '2s ease-out',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class JugarComponent implements OnInit {
  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);
  salasService = inject(SalaService);

  esPrivada = input();
  id = input<string>();

  ngOnInit(): void {
    if (!this.esPrivada() && !this.id()) {
      this.salasService.CrearSala();
    } else if (this.id()) {
      console.log('Intentando unirse a la sala ', this.id());
      this.salasService.unirseASala(parseInt(this.id()!));
    } else {
      this.salasService.CrearSala(true);
    }
  }

  nuevaRonda() {
    this.salasService.nuevaRonda();
  }
}
