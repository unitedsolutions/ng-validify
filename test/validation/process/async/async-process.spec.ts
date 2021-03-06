import moduleInitializer from '../../../_lib/module-initializer';
import pause             from '../../../_lib/pause';
import Component         from './async-process.component';

describe('validation :: async validators', () => {
  let valueSetter, configs;

  beforeEach(async done => {
    ({valueSetter, configs} = await moduleInitializer(Component));
    done();
  });

  it('invalidates control initially when async validator starts to run', async done => {
    let control = await valueSetter('email', 'dmitriy@dmitriy.org');
    expect(control.valid).toBe(false);
    done();
  });

  it('assigns appropriate error class to the element', async done => {
    let control = await valueSetter('email', 'dmitriy');
    await pause(1100);
    expect(control.$el.hasClass('d-error-asyncEmail')).toBe(true);
    done();
  });

  it('determines correct validation status after async is finished running', async done => {
    let control = await valueSetter('email', 'dmitriy');
    await pause(1100);
    expect(control.valid).toBe(false);
    done();
  });

  it('displays pending status when async validator is running', async done => {
    let {asyncStatusHideClass} = configs;
    let control = await valueSetter('email', 'dmitriy@dmitriy');
    let $asyncs = control.$el.prev().children();
    let $pending = $asyncs.eq(0);
    expect($pending.hasClass(asyncStatusHideClass)).toBe(false);
    done();
  });
  
  it('assigns pending classes to element container and element when async is running', async done => {
    let control = await valueSetter('email', 'dmitriy@dmitriy');
    let {$el, $elContainer} = control.validify.elements;
    
    expect($el.hasClass('d-async-pending')).toBe(true);
    expect($elContainer.hasClass('d-async-pending')).toBe(true);
    await pause(1000);
    expect($el.hasClass('d-async-pending')).toBe(false);
    expect($elContainer.hasClass('d-async-pending')).toBe(false);
    
    done();
  });
  
  it('displays success status message briefly when async validator does not error', async done => {
    let {asyncStatusHideClass} = configs;
    let control = await valueSetter('email', 'dmitriy@dmitriy.org');
    let $asyncs = control.$el.prev().children();
    let $pending = $asyncs.eq(0);
    let $success = $asyncs.eq(1);
    
    await pause(1000);
    expect($pending.hasClass(asyncStatusHideClass)).toBe(true);
    expect($success.hasClass(asyncStatusHideClass)).toBe(false);
    await pause(1000);
    expect($success.hasClass(asyncStatusHideClass)).toBe(true);
    
    done();
  });
});
