import { useState } from 'react';
import { createListItem } from './services/fetch-utils';

export default function ListItemForm({ fetchItems }) {
  // you'll need to track the name and quantity in state
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    // make a new list item in supabase using the form values stored in state
    const newItem = { name, quantity };
    createListItem(newItem);
    // refetch the items using the handler functionpassed down as a prop
    await fetchItems();
    // clear the name and quantity in state to refresh the form
    setName('');
    setQuantity('');
  }

  return (
    <div className='new-item-form-container'>
      {/* on submit, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
          I need . . . 
        <label>
            Quantity
          {/* on change, update the quantity in state */}
          <input 
            onChange={e => setQuantity(e.target.value)} value={quantity}
            // this should be a controlled input, soi set the value based on state
            required 
            type="number" 
            name="quantity"
          />
        </label>
        <label>
            Name
          {/* on change, update the name in state */}
          <input
            onChange={e => setName(e.target.value)} value={name}
            // this should be a controlled input, soi set the value based on state 
            required 
            name="name" />
        </label>
        <button>Add item</button>
      </form>
    </div>
  );
}
