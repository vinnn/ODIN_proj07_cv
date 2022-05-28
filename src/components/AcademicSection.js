import React, { Component } from 'react';
import '../styles/AcademicSection.css';
import uniqid from 'uniqid';


export default class AcademicSection extends Component {

  // ##########################################
  // CONSTRUCTOR
  // ##########################################
  constructor(props) {
    super(props);

    this.state = {
      item: {
        school: "",
        title: "",
        year: "",
        editMode: false,
        uid: uniqid()
      },
      itemList: [],
    };

    // copyState to use in onClickCancel
    // - creates another instance of this.state
    // (it works but not sure about how correct it is)
    this.copyState = {...this.state};


    this.onClickEdit = this.onClickEdit.bind(this)
    this.onChangeEdit = this.onChangeEdit.bind(this)
    this.onClickSubmit = this.onClickSubmit.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
  }


  // ##########################################
  // FUNCTIONS - TO UPDATE THE STATES
  // ##########################################


  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ON CLICK ADD  [DONE]
  onClickAdd = (e) => {
    // turn all items to non-edited mode (only one item should be 
    // edited at a time)
    this.setState( {
      item: {...this.state.item},
      itemList: this.state.itemList.map( itemi => { return ({...itemi, editMode: false})  } )
    }, () => { // since the state updates can be unsynchronous:

        // adds an item block with empty fields (in edit mode):
          const emptyItem = {school: "", title: "", year: "", editMode: false, uid: uniqid()};
          this.setState({
            item: emptyItem,
            itemList: this.state.itemList.concat(emptyItem)
          }, () => {
            // console.log(this.state)  // update of the state is asynchronous
          });

    });

  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ON CLICK EDIT   [DONE]
  onClickEdit = (e) => {
    // id of the item selected:
    const itemKey = e.target.attributes.uid.value;

    this.setState({
      // state.item to take the values of the itemList[uid===itemKey]
      item: this.state.itemList.filter(itemi => itemi.uid === itemKey)[0],
      // switch all the editMode to false, except the item with itemKey
      itemList: this.state.itemList.map( (itemi) => 
           (itemi.uid === itemKey) ? 
                {
                  ...itemi,
                  editMode: true
                } 
            : 
                {
                  ...itemi,
                  editMode: false
                } 
      )
    })

    // make a copy of the state if needed for onClickCancel
    this.copyState = {...this.state};

  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ON CHANGE EDIT     [DONE]
  onChangeEdit = (e) => {
    // name (in the state) of the property changed:
    const statePropName = e.target.attributes.name.value;
    // new value for the property changed:
    const newPropValue = e.target.value;
    // update the property in the state,
    // (... is spreading the existing state.item in the 
    // new state.item, except the changed property)
    this.setState({
      item: {
        ...this.state.item,
        [statePropName]: newPropValue
      }
    })
  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ON CLICK SUBMIT      [DONE]
  onClickSubmit = (e) => {
    // id of the item selected:
    const itemKey = e.target.attributes.uid.value;

    this.setState({
      item: this.state.item,
      itemList: this.state.itemList.map( (itemi) => 
           (itemi.uid === itemKey) ? 
                {
                  school: this.state.item.school, 
                  title: this.state.item.title, 
                  year: this.state.item.year,
                  uid: this.state.item.uid,
                  editMode: false
                } 
            : itemi
      )
    })
  }


  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ON CLICK CANCEL  
  onClickCancel = (e) => {
    // set the state to the copy made at onClickEdit
    this.setState( this.copyState );
  }

  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ON CLICK DELETE  
  onClickDelete = (e) => {
    // id of the item selected:
    const itemKey = e.target.attributes.uid.value;

    this.setState({
      itemList: this.state.itemList.filter(itemi => itemi.uid !== itemKey)
    })
  }



  // ##########################################
  // THE RENDER FUNCTION
  // ##########################################
  render() {
    // destructure the state (cleaner):
    const itemList = this.state.itemList; 
    const methods = {
      onClickEdit: this.onClickEdit, 
      onChangeEdit: this.onChangeEdit, 
      onClickSubmit: this.onClickSubmit, 
      onClickCancel: this.onClickCancel,
      onClickDelete: this.onClickDelete
    };


    return (
      <div className="div-academic">

          <div className="header-academic">
                <div className="title">Academic Background</div>
                <button className="btn-add" onClick={this.onClickAdd}>add</button>
          </div>


          { itemList.map( (item) => { 

            return (
              <Item data={item} key={item.uid} methods={methods}></Item>
            )

          })}

      </div>
    )
  }



}












export class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // destructure the state (cleaner):
    const { school, title, year, editMode, uid } = this.props.data;
    // console.log(this.props.data)
    const { onClickEdit, onChangeEdit, onClickSubmit, onClickCancel, onClickDelete } = this.props.methods;

    return (
      <div className="div-item">

        <div>
            { editMode 
                ?   <ItemEdit 
                        school={school} 
                        title={title} 
                        year={year}
                        uid={uid}
                        onChangeEdit={onChangeEdit} 
                        onClickCancel={onClickCancel}
                        onClickSubmit={onClickSubmit}>
                    </ItemEdit>

                :   <ItemDisplay 
                        school={school} 
                        title={title} 
                        year={year} 
                        uid={uid}
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}>
                    </ItemDisplay>
            }
        </div>

      </div>
    )
  }
}













export class ItemDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // destructure the props (cleaner):
    const { school, title, year, uid, onClickEdit, onClickDelete } = this.props;

    return (
      <div className="div-item-display">

            <div className="header-display">
                <button className="btn-edit" uid={uid} onClick={onClickEdit}>edit</button>
                <button className="btn-edit" uid={uid} onClick={onClickDelete}>delete</button>
            </div>

            <div className="row">
                <div className="label">School :</div>
                <div className="value">{school}</div>
            </div>
            <div className="row">
                <div className="label">Title :</div>
                <div className="value">{title}</div>
            </div>
            <div className="row">
                <div className="label">Year :</div>
                <div className="value">{year}</div>
            </div>

      </div>
    )
  }
}




export class ItemEdit extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
    // destructure the props (cleaner):
    const { school, title, year, uid, onChangeEdit, onClickSubmit, onClickCancel } = this.props;
      // console.log(this.props)
      return (
        <div className="div-item-edit">
  
            <div className="header-edit">
                <button className="btn-submit" uid={uid} onClick={onClickSubmit}>submit</button>            
                <button className="btn-cancel" uid={uid} onClick={onClickCancel}>cancel</button>
            </div>

            <div className="row">
                <div className="label">School :</div>
                <input className="value" uid={uid} defaultValue={school} name="school" onChange={onChangeEdit}/>
            </div>
            <div className="row">
                <div className="label">Title :</div>
                <input className="value" uid={uid} defaultValue={title} name="title" onChange={onChangeEdit}/>
            </div>
            <div className="row">
                <div className="label">Year :</div>
                <input className="value" uid={uid} defaultValue={year} name="year" onChange={onChangeEdit}/>
            </div>

        </div>
      )
    }
}
