import * as React from 'react';
import products from '../../fixture';

interface MyProps {}
interface MyState {}

let prods = products;

class List extends React.Component<MyProps, MyState> {
  render() {
    return (
        <table>
          {
            prods.map((item, index) =>
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.feature1}</td>
                  <td>{item.feature2}</td>
                  <td>{item.year}</td>
                </tr>
            )}
        </table>
    );
  }
}

export default List;