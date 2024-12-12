import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { CrearSalaArgs } from '../../interfaces/crearSala';
import { UsuarioService } from '../../services/usuario.service';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { DetallePartidaComponent } from '../../components/detalle-partida/detalle-partida.component';
import { SalaService } from '../../services/sala.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalFullscreenComponent } from '../../components/modal-fullscreen/modal-fullscreen.component';
import { EstadoJuego } from '../../interfaces/sala';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-jugar',
  standalone: true,
  imports: [
    RouterModule,
    TableroComponent,
    DetallePartidaComponent,
    ModalFullscreenComponent,
  ],
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.scss',
})
export class JugarComponent implements OnInit {
  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);
  salasService = inject(SalaService);
  location = inject(Location);
  esPrivada = input();
  id = input<string>();
  estadosConModal: EstadoJuego[] = [
    'ABANDONADO',
    'EMPATE',
    'ESPERANDO_COMPAÑERO',
    'VICTORIA_FINAL_P1',
    'VICTORIA_FINAL_P2',
    'VICTORIA_P1',
    'VICTORIA_P2',
  ];
  mostrarModal = computed(() =>
    this.estadosConModal.includes(this.salasService.estado())
  );
  estadoAnterior = signal<EstadoJuego>('ESPERANDO_COMPAÑERO');
  cambiarEstadoAnterior = effect(()=> {
    if(this.salasService.estado()){
      setTimeout(()=>{
        this.estadoAnterior.set(this.salasService.estado());
      },300)}
  },{allowSignalWrites:true});
  linkCopiado = signal<boolean>(false);

  ngOnInit(): void {
    this.location.replaceState('jugar');
    if (!this.esPrivada() && !this.id()) {
      this.salasService.CrearSala();
    } else if (this.id()) {
      this.salasService.unirseASala(parseInt(this.id()!));
    } else {
      this.salasService.CrearSala(true);
    }
  }

  nuevaRonda() {
    this.salasService.nuevaRonda();
  }

  // copiarLink(){
  //   navigator.clipboard.writeText(environment.CLIENT_URL+"/jugar/"+this.salasService.id());
  //   this.linkCopiado.set(true);
  //   setTimeout(()=> this.linkCopiado.set(false),2000);
  // }
  
}
