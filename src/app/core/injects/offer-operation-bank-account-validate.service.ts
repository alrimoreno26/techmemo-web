import {Injectable} from "@angular/core";


/**
  Utils para validar cuenta
 */
@Injectable()
export class AccountValidateService {
  //Calculate Itau Account Validate
  calculateItau(agencyNumber: string, accountNumber: string): number {
    var numbers = agencyNumber + accountNumber;
    var sumSeq = 0;
    var sequence = 0;
    for (var i = 0; i < numbers.length; i++) {
      var number = Number(numbers[i]);
      sequence = this.multiplyAccordingParityItau(number, i);
      sequence = this.adjustAccordingLengthItau(sequence);
      sumSeq += sequence;
    }
    return this.moduleItau(sumSeq);
  }

  multiplyAccordingParityItau(number: number, index: number): number {
    return number * (index % 2 == 0 ? 2 : 1);
  }

  adjustAccordingLengthItau(sequence: number): number {
    if (sequence > 9) {
      var numbers = sequence.toString();
      sequence = 0;
      for (var i = 0; i < numbers.length; i++) {
        sequence += Number(numbers[i]);
      }
    }
    return sequence;
  }

  moduleItau(sumSeq: number): number {
    var module = sumSeq % 10;
    if (module == 0) {
      return 0;
    } else {
      return (10 - module);
    }
  }

  // Agency validation
  calculateAgencyBrasil(agencyNumber: string): string {
    var numbers = agencyNumber;
    var sumSeq = 0;
    for (var i = 0; i < numbers.length; i++) {
      var seq = 5 - i;
      sumSeq += (Number(numbers.charAt(i)) * seq);
    }
    return this.moduleBrasil(sumSeq);
  }

  //Calculate Banco do Brasil Account Validate
  calculateAccountBrasil(accountNumber: string): string {
    const pesoBB: string = "98765432";
    let soma: number = 0;
    let x: number = pesoBB.length - accountNumber.length;
    for (var j = 0; j < x; j++) {
      accountNumber = [accountNumber.slice(0, 0), "0", accountNumber.slice(0)].join('')
    }

    for (var i = 0; i < pesoBB.length; i++) {
      if (i < x) {
        soma += Number(pesoBB[i]) * 0;
      } else {
        soma += Number(pesoBB[i]) * Number(accountNumber.charAt(i));
      }
    }
    return this.moduleBrasil(soma);
  }

  moduleBrasil(sumSeq: number): string {
    var result = 11 - (sumSeq % 11);
    if (result == 10) {
      return "X";
    } else {
      if (result == 11) {
        return "0";
      } else {
        return result.toString();
      }
    }
  }

  calculateBanrisul(accountNumber: string): string {
    var numbers = accountNumber;
    var sumSeq = 0;

    for (var i = 0; i < numbers.length; i++) {
      var number = Number(numbers.charAt(i));
      sumSeq += this.multiplyAccordingWeightBanrisul(number, i);
    }

    return this.moduleBanrisul(sumSeq).toString();
  }

  multiplyAccordingWeightBanrisul(number: number, index: number): number {
    const weight: number[] = [3, 2, 4, 7, 6, 5, 4, 3, 2];
    return number * weight[index];
  }

  moduleBanrisul(sumSeq: number): number {
    var module = sumSeq % 11;
    if (module == 0) {
      return 0;
    } else if (module == 1) {
      return 6;
    }
    return 11 - module;
  }

  calculateAccountBradesco(accountNumber: string): string {
    var numbers = accountNumber;
    var sumSeq = 0;
    var sequence = 0;
    for (var i = 0; i < numbers.length; i++) {
      var number = Number(numbers.charAt(i));
      sumSeq += this.multiplyAccordingWeightBradesco(number, i);
    }
    return this.accountModuleBradesco(sumSeq);
  }

  multiplyAccordingWeightBradesco(number: number, i: number) {
    const weight: number[] = [2, 7, 6, 5, 4, 3, 2];
    return number * weight[i];
  }

  accountModuleBradesco(sumSeq: number): string {
    var module = sumSeq % 11;
    if (module == 0) {
      return "0";
    } else {
      if (module == 1) {
        return "P";
      } else {
        return (11 - module).toString();
      }
    }
  }

  // Agency validation
  calculateAgencyBradesco(agencyNumber: string): string {
    var numbers = agencyNumber;
    var sumSeq = 0;
    var sequence = 0;
    for (var i = 0; i < numbers.length; i++) {
      var seq = 5 - i;
      sumSeq += (Number(numbers.charAt(i)) * seq);
    }
    return this.agencyModuleBradesco(sumSeq);
  }

  agencyModuleBradesco(sumSeq: number): string {
    var result = 11 - (sumSeq % 11);
    if (result == 10) {
      return "P";
    } else {
      if (result == 11) {
        return "0";
      } else {
        return result.toString();
      }
    }
  }

  calculateSantander(agencyNumber: string, accountNumber: string, accountDigit: string): boolean {
    //const accountNumberComplete = "0".repeat(8 - accountNumber.length) + accountNumber
    if (accountNumber.length === 8) {
      let sum = 0
      let numbers = agencyNumber + "00" + accountNumber
      for (let i = 0; i < numbers.length; i++) {
        sum += this.multiplyAccordingWeightSantander(parseInt(numbers.charAt(i)), i)
      }
      return this.moduleSantander(parseInt(sum.toString().substr(-1))).toString() === accountDigit
    } else {
      return false
    }
  }

  multiplyAccordingWeightSantander(num: number, index: number): number {
    let weight = [9, 7, 3, 1, 0, 0, 9, 7, 1, 3, 1, 9, 7, 3]
    return Number((num * weight[index]).toString().substr(-1))
  }

  moduleSantander(sum: number): number {
    if (sum === 0) {
      return 0
    } else {
      return (10 - sum)
    }
  }

  calculateCaixa(agencyNumber: string, accountNumber: string, accountDigit: string): boolean {
    if (accountNumber.length === 11) {
      let sum = 0
      let numbers = agencyNumber + accountNumber;
      for (let i = 0; i < numbers.length; i++) {
        sum += this.multiplyAccordingWeightCaixa(parseInt(numbers.charAt(i)), i)
      }
      return this.moduleCaixa(sum) === accountDigit
    } else {
      return false
    }
  }

  multiplyAccordingWeightCaixa(num: number, index: number): number {
    let weight = [8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    return num * weight[index]
  }

  moduleCaixa(sum: number): string {
    let multiSum = sum * 10 | 0
    let modulo = (multiSum / 11 | 0) * 11 | 0
    let modModule = multiSum % 11
    if (modModule === 10) {
      return "0"
    } else {
      return (multiSum - modulo | 0).toString()
    }
  }

  calculateCity(agencyNumber: string, accountNumber: string, accountDigit: string): boolean {
    if (accountNumber.length === 10) {
      let sum = 0
      let numbers = accountNumber;
      for (let i = 0; i < numbers.length; i++) {
        sum += this.multiplyAccordingWeightCity(parseInt(numbers.charAt(i)), i)
      }
      return this.moduleCity(sum) === accountDigit
    } else {
      return false
    }
  }

  multiplyAccordingWeightCity(num: number, index: number): number {
    let weight = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    return num * weight[index]
  }

  moduleCity(sum: number): string {
    let multiSum = sum * 10 | 0
    let modulo = (multiSum / 11 | 0) * 11 | 0
    let modModule = multiSum % 11
    if (modModule === 10) {
      return "0"
    } else {
      return (multiSum - modulo | 0).toString()
    }
  }

  calculateHsbc(agencyNumber: string, accountNumber: string, accountDigit: string): boolean {
    if (accountNumber.length === 6) {
      let sum = 0
      let numbers = agencyNumber + accountNumber;
      for (let i = 0; i < numbers.length; i++) {
        sum += this.multiplyAccordingWeightHsbc(parseInt(numbers.charAt(i)), i)
      }
      return this.moduleHsbc(sum) === accountDigit
    } else {
      return false
    }
  }

  multiplyAccordingWeightHsbc(num: number, index: number): number {
    let weight = [8, 9, 2, 3, 4, 5, 6, 7, 8, 9]
    return num * weight[index]
  }

  moduleHsbc(sum: number): string {
    let multiSum = sum * 10 | 0;
    let modulo = (multiSum / 11 | 0) * 11 | 0;
    let modModule = multiSum % 11;
    if (modModule === 10) {
      return "0";
    } else {
      return (multiSum - modulo | 0).toString()
    }
  }
}
