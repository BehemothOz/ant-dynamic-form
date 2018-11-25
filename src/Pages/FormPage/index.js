import React, { Fragment } from 'react';
import { Form, Row, Col, Icon, Input, Button } from 'antd';

import FormDynamicWrapper from '../../FormComponents/FormDynamicWrapper';

const FormItem = Form.Item;

let id = 1;

const data = {
  company: 'Bill and Jacky',
  email: 'bill_and_jacky@proncip.com',
  users: [
    { id: 1, 'first_name': 'Ivan', 'second_name': 'Ivanov', age: '25' },
    // { id: 2, firstName: 'Masha', secondName: 'Mashonova', age: '45' }
  ]
};

class DynamicFieldSet extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(++id);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');


    const formItems = keys.map((k, index) => {
      return (
        <Fragment>
          <FormItem
            label={index === 0 ? 'Passengers' : ''}
            required={false}
            key={k}
          >
            {getFieldDecorator(`names[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field."
                }
              ]
            })(
              <Input
                placeholder="passenger name"
                style={{ width: '60%', marginRight: 8 }}
              />
            )}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>
        </Fragment>
      );
    });

    return (
      <section style={{ width: '700px', margin: '0 auto' }}>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <FormItem>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </FormItem>

          <Row gutter={16}>
            <Col span={12}>
              <FormItem>
                {getFieldDecorator('company', { initialValue: data.company })(
                  <Input placeholder="Enter company" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem>
                {getFieldDecorator('email', { initialValue: data.email })(
                  <Input placeholder="Enter email" />
                )}
              </FormItem>
            </Col>
          </Row>

          {/* {getFieldDecorator('usersKeys', { initialValue: data.users })(
            <FormDynamicWrapper {...this.props} />
          )} */}
          <FormDynamicWrapper {...this.props} initialValue={data.users} />

          <FormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

export default Form.create()(DynamicFieldSet);
