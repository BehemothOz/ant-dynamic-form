import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import FormDynamicItems from '../FormDynamicItems';

const ini = {
  first_name: '',
  second_name: '',
  age: ''
}

class FormDynamicWrapper extends Component {
  remove = k => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const keys = getFieldValue('userKeys');

    setFieldsValue({
      userKeys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;

    const keys = getFieldValue('userKeys');
    const userState = getFieldValue('userState');
    const nextUsersKey = keys.concat(keys.length);

    setFieldsValue({
      userKeys: nextUsersKey,
      userState: [...userState, { id: keys.length + 1, ...ini }]
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { initialValue } = this.props;

    const initialKeys = initialValue.map((_, i) => i);

    getFieldDecorator('userKeys', { initialValue: initialKeys });
    getFieldDecorator('userState', { initialValue: initialValue });

    const getInitalValue = (name, key) => getFieldValue(name)[key];
    const keys = getFieldValue('userKeys');

    return (
      <Fragment>
        <div style={{ marginBottom: '15px' }}>FormDynamicWrapper</div>

        <Button type="dashed" onClick={this.add}>Add user</Button>

        {keys.map(k => {
          return (
            getFieldDecorator(`users[${k}]`)(
              <FormDynamicItems
                key={k}
                serial={k}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={this.props.form.setFieldsValue}
                initialValue={getInitalValue('userState', k)}
                remove={this.remove}
              />
            )
          )
        })}
      </Fragment>
    )
  }
}

export default FormDynamicWrapper;
