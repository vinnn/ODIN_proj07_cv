import React, { Component } from 'react';
import '../styles/GeneralSection.css';


export default class GeneralSection extends Component {

  // ##########################################
  // CONSTRUCTOR
  // ##########################################
  constructor(props) {
    super(props);

    this.state = {
        general: {
          name: "Dude",
          email: "du@de",
          phone: "111223",
          editMode: false,
        },
  
    };
  
    // copyState to use in onClickCancel
    // - creates another instance of this.state
    // (it works but not sure about how correct it is)
    this.copyState = {...this.state};
  

    this.onClickEdit = this.onClickEdit.bind(this)
    this.onChangeEdit = this.onChangeEdit.bind(this)
    this.onClickSubmit = this.onClickSubmit.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
  }

  // ##########################################
  // FUNCTIONS (TO UPDATE THE STATE)
  // ##########################################
  onClickEdit = (e) => {
    console.log("clicked ediiit")
    this.setState({
        general: {
        ...this.state.general,
        editMode: !this.state.general.editMode
        }
      })
      
    // make a copy of the state if needed for onClickCancel
    this.copyState = {...this.state};
  }

  onChangeEdit = (e) => {
    // name (in the state) of the property changed:
    const statePropName = e.target.attributes.name.value;
    
    // new value for the property changed:
    const newPropValue = e.target.value;

    // update the property in the state,
    // (... is spreading the existing state.general in the 
    // new state.general, except the changed property)
    this.setState({
      general: {
        ...this.state.general,
        [statePropName]: newPropValue
      }
    })
  }

  onClickSubmit = (e) => {
    this.setState({
      general: {
        name: this.state.general.name,
        email: this.state.general.email,
        phone: this.state.general.phone,
        editMode: !this.state.general.editMode
      }
    })
  }

  onClickCancel = (e) => {
    // set the state to the copy made at onClickEdit
    this.setState( this.copyState );
  }


  // ##########################################
  // THE RENDER FUNCTION
  // ##########################################
  render() {
    // destructure the state (cleaner):
    const { name, email, phone, editMode } = this.state.general;

    return (
      <div className="div-general">

        <div>
            { editMode 
                ?   <GeneralEdit 
                        name={name} 
                        email={email} 
                        phone={phone} 
                        onChangeEdit={this.onChangeEdit} 
                        onClickCancel={this.onClickCancel}
                        onClickSubmit={this.onClickSubmit}>
                    </GeneralEdit>

                :   <GeneralDisplay 
                        name={name} 
                        email={email} 
                        phone={phone} 
                        onClickEdit={this.onClickEdit}>
                    </GeneralDisplay>
            }
        </div>

      </div>
    )
  }
}




export class GeneralDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // destructure the props (cleaner):
    const { name, email, phone, onClickEdit } = this.props;

    return (
      <div className="div-general-display">

            <div className="header-display">
                <div className="title">General</div>
                <button className="btn-edit" onClick={onClickEdit}>edit</button>
            </div>

            <div className="row">
                <div className="label">Name :</div>
                <div className="value">{name}</div>
            </div>
            <div className="row">
                <div className="label">Email :</div>
                <div className="value">{email}</div>
            </div>
            <div className="row">
                <div className="label">Phone :</div>
                <div className="value">{phone}</div>
            </div>

      </div>
    )
  }
}




export class GeneralEdit extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
    // destructure the props (cleaner):
    const { name, email, phone, onChangeEdit, onClickSubmit, onClickCancel } = this.props;

      return (
        <div className="div-general-edit">
  
            <div className="header-edit">
                <div className="title">General</div>
                <button className="btn-cancel" onClick={onClickCancel}>cancel</button>
                <button className="btn-submit" onClick={onClickSubmit}>submit</button>
            </div>

            <div className="row">
                <div className="label">Name :</div>
                <input className="value" defaultValue={name} name="name" onChange={onChangeEdit}/>
            </div>
            <div className="row">
                <div className="label">Email :</div>
                <input className="value" defaultValue={email} name="email" onChange={onChangeEdit}/>
            </div>
            <div className="row">
                <div className="label">Phone :</div>
                <input className="value" defaultValue={phone} name="phone" onChange={onChangeEdit}/>
            </div>

        </div>
      )
    }
}


