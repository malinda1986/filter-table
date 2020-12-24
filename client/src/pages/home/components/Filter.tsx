// @ts-nocheck
import 'antd/dist/antd.css';
import React from "react";
import { Button, Row, Col, Form, Input, InputNumber, Radio } from 'antd';

const Filter: React.FC = ({formRef, handleSubmit, handleReset}) => {
  return (
    <div>
        <Form ref={formRef}>
        <Row gutter={24}>
          <Col  xl={{ span: 4 }} md={{ span: 6}}>
            <Form.Item name="name">
              <Input
                placeholder={`Bank name`}
              />
            </Form.Item>
          </Col>
          <Col  xl={{ span: 4 }} md={{ span: 6}}>
            <Form.Item name="bic">
              <Input
                placeholder={`BIC`}
              />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 6 }}
            md={{ span: 5 }}
            id="publishStatus"
          >
            <Form.Item name="publishStatus">
              <Radio.Group defaultValue="all" buttonStyle="solid">
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="published">Published</Radio.Button>
                <Radio.Button value="unpublished">Unpublished</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 4 }}
            md={{ span: 4 }}
            sm={{ span: 12 }}
            id="createTimeRangePicker"
          >
                <Row>
                    <Col span={12}>
                        <Form.Item name="minRange">
                            <InputNumber
                                min={1}
                                placeholder={"Min score"}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="maxRange">
                            <InputNumber
                                min={1}
                                placeholder={"Max score"}
                                //style={{ margin: '0 16px' }}
                                //value={inputValue}
                                //onChange={this.onChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>
          </Col>
          <Col
            xl={{ span: 4 }}
            md={{ span: 4 }}
            sm={{ span: 8 }}
          >
            <Row type="flex" gutter={3} align="middle" justify="space-between">
              <div>
                <Button
                  type="primary" htmlType="submit"
                  className="margin-right"
                  id="search"
                  onClick={handleSubmit}
                >
                <span>Search</span>
                </Button>&nbsp;
                <Button 
                onClick={handleReset}
                >
                <span>Reset</span>
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
        </Form>
    </div>
  );
};

export default Filter;
