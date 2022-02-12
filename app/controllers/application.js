import Controller from '@ember/controller';
import enumify from '../utils/enumify';

const operations = enumify(['mod', 'mul', 'div', 'add', 'sub']);

export default Controller.extend({
  inputField: '0',
  operation: null,
  operandA: null,
  isOperationJustUpdated: false,
  memory: 0,

  setOperation(operation) {
    if (this.get('operation') !== null)
      this.actions.calculate.call(this);
    this.setProperties({
      operation: operation,
      isOperationJustUpdated: true
    });
  },

  pushOperand() {
    this.setProperties({
      operandA: Number(currentValue),
      inputField: String(number),
      isOperationJustUpdated: false
    });
  },

  actions: {
    input(number) {
      let currentValue = this.get('inputField');
      if (this.get('operationJustUpdated')) {

        return;
      }
      if (currentValue === '0')
        currentValue = '';
      this.set('inputField', currentValue + String(number));
    },

    clear() {
      this.set('inputField', '0');
    },

    fullClear() {
      this.setProperties({
        inputField: '0',
        operation: null,
        operandA: null,
        isOperationJustUpdated: false
      });
    },

    decimalSeparator() {
      let currentValue = this.get('inputField');
      if (currentValue.indexOf('.') !== -1)
        this.set('inputField', currentValue + '.');
    },

    sign() {
      let currentValue = this.get('inputField');
      if (currentValue === '0') return;
      this.set('inputField', currentValue[0] === '-' ? currentValue.substr(1) : '-' + currentValue);
    },

    mod() {
      this.setOperation(operations.mod);
    },

    mul() {
      this.setOperation(operations.mul);
    },

    div() {
      this.setOperation(operations.div);
    },

    add() {
      this.setOperation(operations.add);
    },

    sub() {
      this.setOperation(operations.sub);
    },

    calculate() {
      let operandB = Number(this.get('inputField'));
      let operandA = this.get('operandA');
      let operation = this.get('operation');
      if (operation === null) return;
      let result;
      switch(operation) {
        case operations.mod:
          result = operandA % operandB;
          break;
        case operations.mul:
          result = operandA * operandB;
          break;
        case operations.div:
          result = operandA / operandB;
          break;
        case operations.add:
          result = operandA + operandB;
          break;
        case operations.sub:
          result = operandA - operandB;
          break;
      }

      this.setProperties({
        operation: null,
        operandA: result,
        inputField: String(result).replace(',', '.'),
        isOperationJustUpdated: false
      })
    },

    memoryClear() {
      this.set('memory', 0);
    },

    memoryAdd() {
      this.set('memory', this.get('memory') + Number(this.get('inputField')));
    },

    memoryRestore() {
      this.set('inputField', String(this.get('memory')));
    },

    terminate() {
      window.exonicAPI.terminateApplication()
      // new QWebChannel(qt.webChannelTransport, channel => channel.objects.exonicAPI.terminateApplication());
    }
  }
});
