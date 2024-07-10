import {TreeNode} from 'primeng/api';
import {Options} from "../../../../core/models";
import {BalanceAccountType, operatorCalculationTO} from "../../../../core/enums/commerce";
import {AccountStructureTO, BalanceFormatAccount, operatorConditionalTO} from "../../../../core/models/bills";

export const typeAccount: Options[] = [
  {name: 'balance.structure.type.ACTIVE', value: BalanceAccountType.ACTIVE},
  {name: 'balance.structure.type.PASSIVE', value: BalanceAccountType.PASSIVE},
  {name: 'balance.structure.type.DRE', value: BalanceAccountType.DRE}
];

export const operatorOptions: Options[] = [
  {name: '?', value: null},
  {name: '+', value: operatorCalculationTO.ADD},
  {name: '-', value: operatorCalculationTO.SUB},
  {name: '*', value: operatorCalculationTO.MULT},
  {name: '/', value: operatorCalculationTO.DIV}
];
export const operatorConditionalOptions: Options[] = [
  {name: '===', value: operatorConditionalTO.EQUAL},
  {name: '<', value: operatorConditionalTO.LESSER},
  {name: '=<', value: operatorConditionalTO.LESSER_EQUAL},
  {name: '>', value: operatorConditionalTO.GREATER},
  {name: '>=', value: operatorConditionalTO.GREATER_EQUAL},
];

export function buildTreeNodes(base: any[] = [],
                               listBase: (AccountStructureTO | BalanceFormatAccount)[] = [],
                               parent: string, key: string): TreeNode[] {
  return base.map(child => {
    // @ts-ignore
    const children = listBase.filter(f => f[parent] === child[key]);
    const {name, sheet, id} = child;
    if (children.length === 0) {
      // @ts-ignore
      return child[parent] ?
        {key: id, label: name, data: child, position: child.position, leaf: true, expanded: false, type: 'sheet', children: []} :
        {key: id, label: name, data: child, position: child.position, leaf: true, expanded: false, type: 'root', children: []};
    }
    return {
      key: id, label: name, data: child, position: child.position, leaf: sheet, expanded: false,
      children: buildTreeNodes(children, listBase, parent, key)
    };
  });
}
