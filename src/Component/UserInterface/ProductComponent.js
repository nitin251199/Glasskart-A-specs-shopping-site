import React,{ useState,useEffect } from 'react';
import  {getData,ServerURL,postData} from "../FetchNodeServices"
import Radio from '@material-ui/core/Radio';

export default function ProductComponent(props){
    const [productStyle,setProductStyle]=useState({
        width:380,
        height:350,
        padding:10,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 28
    })
    var itemProps = props.product
    const [item,setItem] = useState({details:[]})
    const [selected,setSelected] = useState({finalproductid:'',colorid:'',colorname:'',offerprice:'',price:'',productpicture:''})
    const [status,setStatus] = useState(false)

    const fetchFinalProductDetails=async()=>{
        var body={productid:itemProps.productid}
        const result=await postData("finalproduct/fetchallfinalproductsbyproductid",body)
      setItem((prev)=>({...prev,details:result.data}))
      if(result.data.length > 0) {
        var {finalproductid,colorid,colorname,offerprice,price,productpicture} = result.data[0]
        setSelected({finalproductid,colorid,colorname,offerprice,price,productpicture})
    }
  }

    const onChangeStyle = async (event) => {
        setProductStyle((prev)=>({...prev,border:'1px solid black'}))
      await  fetchFinalProductDetails()
      setStatus(true)
      }
    const onRemoveChangeStyle = (event) => {
      setProductStyle((prev)=>({...prev,border:null}))
     setStatus(false)
    }

    const handleChange = (item) => {
      var {finalproductid,colorid,colorname,offerprice,price,productpicture} = item
      setSelected({finalproductid,colorid,colorname,offerprice,price,productpicture})
    }

    const handleClick=(itemProps,selected,item)=>{
      props.history.push({pathname:'/productview'},{itemProps:itemProps,selected:selected,item:item})
    }

    return(
        <div onMouseEnter={(event) => onChangeStyle(event)} 
             onMouseLeave={(event) => onRemoveChangeStyle(event)} 
             style={productStyle}>
               <div style={{display: 'flex',justifyContent: 'center',flexDirection: 'column',marginTop: 50}}>
        <img src={`${ServerURL}/images/${status?selected.productpicture:itemProps.picture}`} width="auto" 
         onClick={()=>handleClick(itemProps,selected,item)}/>
               </div>
        { status &&

        <div>
            
            <div style={{display: 'flex',justifyContent: 'center',flexDirection: 'row',alignItems: 'center',marginTop: 20}}>
              {item.details.map((finalitem)=>{
                return(<div>
                  <Radio
                  checked={selected.finalproductid === finalitem.finalproductid}
                  onChange={()=>handleChange(finalitem)}
                  //value="a"
                  style={{color:finalitem.colorname}}
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'A' }}
                />
                </div>)
              })}

            </div>
            <div style={{textAlign: 'center'}}>
                {itemProps.productname}
            </div>
            <div style={{textAlign:'center'}}>{selected.offerprice>0?<span><s>&#8377; {selected.price}</s> &nbsp; <span style={{color:'#0984e3'}}>&#8377; {selected.offerprice}</span></span>:<span>&#8377; {selected.price}</span>}</div>
        </div>
            }

      </div>
    )


}