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
  mesSelecionado!: string;
 

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

  onChange(){

  this.CadastrarConta();
  this.ExibirProdutos();
  this.ExibirSaldo();
  this.TotalContas();
  this.TotalSaldo();
  this.CadastrarSaldo();
  // this.mesSelecao()
  // this.ExcluirConta();
  // this.saveSelectedOption();
    localStorage.setItem('mesSelecionado', this.mesSelecionado);
  
}

  ngOnInit(): void {
    this.ExibirProdutos();
    this.ExibirSaldo();
    this.TotalContas();
    this.TotalSaldo();
    // this.SelecaoMes();
    this.formulario = new FormGroup({
      contaId: new FormControl(),
      nome: new FormControl(),
      valor: new FormControl(),
      isPaid: new FormControl(),
    });
    this.balance = new FormGroup({
      saldo: new FormControl(),
    });

    // console.log(this.contas)
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
    console.log(value)

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
            // offset: 10,
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
            // offset: 20,
            borderRadius: 10,
          },
        ]
      }
    });
    
    
    // const storedValue = localStorage.getItem('mesSelecionado');
    // if (storedValue) {
    //   this.mesSelecionado = storedValue;
    // }
    // else{
    //   this.mesSelecionado = 'Janeiro'
    // }
    // console.log(this.balances)
    // this.loadSelectedOption();
  }
  
  loadSelectedOption(): void {
    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
      this.mesSelecionado = savedOption;
    }
  }

  saveSelectedOption(): void {
    localStorage.setItem('selectedOption', this.mesSelecionado);
  }
// Função para salvar a opção selecionada no localStorage


  // mesSelecao(){
    
  // localStorage.setItem('mesSelecionado', this.mesSelecionado);
  // // CADASTRO DE CONTAS
  // }
  CadastrarConta(): void {
    this.formulario.value.contaId = Guid.create().toString();
    const conta: Conta = this.formulario.value;
    this.contas.push(conta);
    // localStorage.setItem("BD", JSON.stringify(this.contas));
    localStorage.setItem(`contas_${this.mesSelecionado}`, JSON.stringify(this.contas));
    this.formulario.reset();
    this.closePopup()
    window.location.reload();
  }

  ExibirProdutos(): void {
    const savedData = localStorage.getItem(`contas_${this.mesSelecionado}`)
    if (savedData !== null) {
      this.contas = JSON.parse(savedData);
      // console.log(this.contas)
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
      // console.log(this.contas[i].valor)
      const valores = this.contas[i].valor;
      soma += valores;
      valores1.push(soma)
    }
    console.log(soma)
    this.valorfinal = soma;
  }

  // CADASTRO DE SALDO

  CadastrarSaldo(): void {
      const saldo: Balance = this.balance.value;
      localStorage.removeItem(`saldo_${this.mesSelecionado}`)
      // this.balances.push(saldo);
      this.balances = [saldo]
      localStorage.setItem(`saldo_${this.mesSelecionado}`, JSON.stringify(this.balances));
      this.balance.reset();
      // console.log(saldo);
      this.closePopupBalance()
      window.location.reload();
  }
  
  ExibirSaldo(): void {
      const savedData = localStorage.getItem(`saldo_${this.mesSelecionado}`)
      if (savedData !== null) {
        this.balances = JSON.parse(savedData);
        // console.log(this.balances)
  
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
        saldototal = total
        result = total - this.valorfinal;
        valores2.push(total)
      }
      this.saldo = result
      this.totalsaldo = saldototal
      // console.log(this.saldo)
      // console.log(this.saldo)
  
  }

}