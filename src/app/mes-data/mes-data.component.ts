import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Conta } from '../conta';
import { Guid } from 'guid-typescript';
import { faCheckCircle, faXmark, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormControl, FormsModule } from "@angular/forms";
import { Chart } from "chart.js/auto";
import { Balance } from '../balance';


@Component({
  selector: 'app-mes-data',
  templateUrl: './mes-data.component.html',
  styleUrls: ['./mes-data.component.css'],
})
export class MesDataComponent implements OnInit {
  @ViewChild('infotable') tableContainer!: ElementRef;

  showPopUp = false;
  faCheckCircle = faCheckCircle;
  faXmark = faXmark;
  faMoneyCheckDollar = faMoneyCheckDollar
  contas!: Conta[];
  formulario: any;
  balances: Balance[] = [];
  balance: any;
  valorfinal!: number;
  saldo!: number;
  totalsaldo!: number;
  chartValue = [];
  showPopUpBalance!: boolean;
  contasPorMes: { [key: string]: Conta[] } = {};
  mesSelecionado!: number;
  informacoesMes: string[] = [];
  editingConta: Conta | null = null;
  showPopUpEdit!: boolean;



  constructor() { };

  closePopup() {
    this.showPopUp = false;
  }

  showContentPop() {
    this.showPopUp = true
  }

  showContentPopBalance() {
    this.showPopUpBalance = true
  }

  closePopupBalance() {
    this.showPopUpBalance = false;
  }

  onChange() {

    this.CadastrarConta();
    this.ExibirProdutos();
    this.ExibirSaldo();
    this.TotalContas();
    this.TotalSaldo();
    this.CadastrarSaldo();

    window.location.reload();

  }

  ngOnInit(): void {
    this.atualizarMesSelecionado();
    this.carregarInformacoesMes();
    this.ExibirProdutos();
    this.ExibirSaldo();
    this.TotalContas();
    this.TotalSaldo();

    this.formulario = new FormGroup({
      contaId: new FormControl(),
      nome: new FormControl(),
      valor: new FormControl(),
      isPaid: new FormControl(),
    });
    this.balance = new FormGroup({
      saldo: new FormControl(),
    });

    const value = [];
    const name = [];
    for (let i = 0; i < this.contas.length; i++) {
      const valor = this.contas[i].valor;
      const nome = this.contas[i].nome;
      if (this.contas.length > 0) {
        value.push(valor);
        name.push(nome)

      }
    }

    const previousChart = Chart.getChart('meuCanvas');
    if (previousChart) {
      previousChart.destroy();
    }

    const previousChart1 = Chart.getChart('meuCanvas2');
    if (previousChart1) {
      previousChart1.destroy();
    }


    new Chart('meuCanvas', {
      type: 'doughnut',
      data: {
        labels: name,
        datasets: [
          {
            label: "custo",

            data: value,
            backgroundColor: [
              '#14c8ab',
              '#ff5358',
              '#754eff'
            ],
            hoverOffset: 4,
            borderRadius: 10,
          },
        ]
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 16,
              },

            }
          }
        }
      }
    });
    new Chart('meuCanvas2', {
      type: 'doughnut',
      data: {
        labels: ["contas", "Saldo"],
        datasets: [
          {
            label: "valor",

            data: [this.valorfinal, this.saldo],
            backgroundColor: [
              '#14c8ab',
              '#ff5358',
              '#754eff'
            ],
            hoverOffset: 4,
            borderRadius: 10,
          },
        ]
      }
    });


  }


  carregarInformacoesMes() {
    const informacoesMesLocalStorage = localStorage.getItem(`contas_${this.mesSelecionado}`);
    const informacoesMesLocalStoragesaldo2 = localStorage.getItem(`saldo_${this.mesSelecionado}`);
    this.contas = informacoesMesLocalStorage ? JSON.parse(informacoesMesLocalStorage) : [];
    this.balances = informacoesMesLocalStoragesaldo2 ? JSON.parse(informacoesMesLocalStoragesaldo2) : [];
  }

  reload() {
    window.location.reload();
  }


  CadastrarConta(): void {
    if (this.formulario) {
      this.formulario.value.contaId = Guid.create().toString();
      const conta: Conta = this.formulario.value;
      this.contas.push(conta);
      localStorage.setItem(`contas_${this.mesSelecionado}`, JSON.stringify(this.contas));
      this.formulario.reset();
      this.closePopup()
      this.mesSelecionado = parseInt(localStorage.getItem('mesSelecionado') || '1');
    }
    window.location.reload();
  }


  ExibirProdutos(): void {
    const savedData = localStorage.getItem(`contas_${this.mesSelecionado}`)
    if (savedData !== null) {
      this.contas = JSON.parse(savedData);
    }
    else {

      this.contas = [];
    }
  }


  AtualizarConta(contaId: string) {
    const indice: number = this.contas.findIndex(p => p.contaId == contaId);

    if (this.contas[indice].isPaid) {
      this.contas[indice].isPaid = false;
    }
    else {
      this.contas[indice].isPaid = true
    }

    localStorage.setItem(`contas_${this.mesSelecionado}`, JSON.stringify(this.contas))
    window.location.reload();
  }

  ExcluirConta(id: string) {
    for (let i = 0; i < this.contas.length; i++) {
      if (this.contas[i].contaId == id) {
        this.contas.splice(i, 1);
        window.location.reload();
      }

      localStorage.setItem(`contas_${this.mesSelecionado}`, JSON.stringify(this.contas))
    }

  }

  TotalContas(): void {
    const valores1: number[] = [];
    let soma = 0;
    for (let i = 0; i < this.contas.length; i++) {
      const valores = this.contas[i].valor;
      soma += valores;
      valores1.push(soma)
    }
    this.valorfinal = soma;
  }

  // CADASTRO DE SALDO

  CadastrarSaldo(): void {
    const saldo: Balance = this.balance.value;
    localStorage.removeItem(`saldo_${this.mesSelecionado}`)
    this.balances = [saldo]
    localStorage.setItem(`saldo_${this.mesSelecionado}`, JSON.stringify(this.balances));
    this.balance.reset();
    this.closePopupBalance();
    window.location.reload();
  }

  ExibirSaldo(): void {
    const savedData = localStorage.getItem(`saldo_${this.mesSelecionado}`)
    if (savedData !== null) {
      this.balances = JSON.parse(savedData);

    }
    else {
      this.balances = [];
    }
  }

  TotalSaldo(): void {
    const valores2 = [];
    let result = 0;
    let saldototal = 0;
    for (let i = 0; i < this.balances.length; i++) {
      const total = this.balances[i].saldo
      saldototal = total;
      result = total - this.valorfinal;
      valores2.push(total)
    }
    this.saldo = result
    this.totalsaldo = saldototal
  }

  atualizarMesSelecionado() {
    const selectMes = document.getElementById('mes') as HTMLSelectElement;
    this.mesSelecionado = parseInt(localStorage.getItem('mesSelecionado') || '1');
    selectMes.value = this.mesSelecionado.toString();
    selectMes.addEventListener('change', () => {
      this.mesSelecionado = parseInt(selectMes.value);
      // localStorage.setItem('mesSelecionado', this.mesSelecionado.toString());
      localStorage.setItem('mesSelecionado', this.mesSelecionado.toString());
      this.carregarInformacoesMes();
    });
    this.carregarInformacoesMes();
  }

  


  editarConta(conta: Conta) {
    this.editingConta = { ...conta };
    this.showPopUpEdit = true;
  }
  salvarEdicaoConta() {
    const indice: number = this.contas.findIndex(p => p.contaId === this.editingConta?.contaId);
    if (indice !== -1 && this.editingConta) {
      this.contas[indice] = { ...this.editingConta };
     
      localStorage.setItem(`contas_${this.mesSelecionado}`, JSON.stringify(this.contas));
      this.ClosePopup2();
      window.location.reload();
    }
  }
  
  ClosePopup2() {
    this.showPopUpEdit = false;
    this.editingConta = null;
  }
  

}