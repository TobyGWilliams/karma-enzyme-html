// import { mount } from 'enzyme';

const enzyme = require('enzyme');

const createElement = (nodeType = 'div') => {
  const node = document.createElement(nodeType);
  node.style.backgroundColor = '#F5F5F5';
  node.style.marginBottom = '2em';
  node.style.padding = '1em';
  node.className = 'testResult';
  node.dataset.current = true;

  return node;
};

class TestBed {
  constructor() {
    this.body = document.querySelector('body');
    this.previousResult = document.querySelectorAll('.testResult[data-current="true"]');
    this.previousResult.forEach(e => {
      e.style.display = 'none';
      e.dataset.current = false;
    });
  }
}

class TestBedTarget extends TestBed {
  constructor() {
    super();
    this.rootElement = this.body.appendChild(createElement());
  }

  generateStore({ dispatch = () => null, state = {}, subscribe = () => null }) {
    this.store = {
      dispatch,
      getState: () => state,
      subscribe,
    };
  }

  mountComponent(component) {
    const { rootElement, store } = this;
    return enzyme.mount(component, { attachTo: rootElement, context: { store } });
  }

  remove() {
    this.rootElement.remove();
  }
}

module.exports = TestBedTarget;
