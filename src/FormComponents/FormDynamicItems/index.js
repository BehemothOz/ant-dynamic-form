import React, { Component } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';

const FormItem = Form.Item;

// Warning: One field name cannot be part of another, e.g. `a` and `a.b`.

class FormDynamicItems extends Component {
  onCheckName = (value, name) => {
    const { setFieldsValue } = this.props;

    if (value === '') {
      setFieldsValue({
        [`${name}age`]: ''
      })
    }
  }

  render() {
    const {
      serial,
      initialValue,
      getFieldDecorator,
      remove
    } = this.props;

    const {
      id,
      first_name: firstName,
      second_name: secondName,
      age
    } = initialValue;

    const name = `users[${serial}]`;

    return (
        <Row key={id} gutter={24}>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`users[${serial}]first_name`, {
                initialValue: firstName,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input user's name."
                  }
                ]
                })(
                <Input placeholder="Enter first name" onChange={(e) => this.onCheckName(e.target.value, name)}/>
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`${name}second_name`, { initialValue: secondName || '' })(
                <Input placeholder="Enter second name" />
              )}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator(`${name}age`, { initialValue: age || '' })(
                <Input placeholder="Enter age" />
              )}
            </FormItem>
          </Col>
          <Col span={3}>
            <FormItem>
              <Button type="danger" onClick={()=> remove(serial)}>del</Button>
            </FormItem>
          </Col>
        </Row>
    );
  }
}

export default FormDynamicItems;
