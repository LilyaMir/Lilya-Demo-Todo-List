function Flex(props){
    const styles = {display: 'flex'};
    if(props.justifyContent){
        styles.justifyContent = props.justifyContent;
    }
    if(props.border){
        styles.border = '1px double red';
    }

    return (
        <div style={styles}>
        {props.children}
        </div>
    )
}

export default Flex;