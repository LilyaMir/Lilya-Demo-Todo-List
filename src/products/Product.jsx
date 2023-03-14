import { Component } from 'react';
import Price from './Price';
import Name from './Name';
import Description from './Description';

class Product extends Component{

    render(){
        const {name, price, description} = this.props;
        return (
            <div>
            <Name text={name}/>
            <Price text={price}/>
             <Description text={description}/>
             <hr />
            </div>
            );
    }
}

export default Product;