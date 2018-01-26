import * as React from 'react';
interface MyProps {}
interface MyState {}

export default class RecordBase extends React.Component<MyProps, MyState> {
    render() {
        return <h2>Test</h2>;
    }
}