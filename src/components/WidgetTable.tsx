import React, { useState, useEffect, FormEvent } from 'react';
import IWidgetData from '../types/Widget';
import WidgetService from '../services/WidgetService';
import { useNavigate } from 'react-router-dom';

const WidgetTable: React.FC = () => {

  let navigate = useNavigate();
  const [widgets, setWidgets] = useState<IWidgetData[]>([]);
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetchWidgets();
  }, []);

  const fetchWidgets = async () => {
    try {
      const response = await WidgetService.getAll();
      setWidgets(response.data);
    } catch (error) {
      console.error('Error fetching widgets:', error);
    }
  };

  const createWidget = async (e: FormEvent) => {
    var data = {
        name: name,
        manufacturer: manufacturer,
        stock_level: parseInt(stock)
      };
    e.preventDefault()
    try {
      const response = await WidgetService.create(data);
      setWidgets([...widgets, response.data]);
      clearForm();
    } catch (error) {
      console.error('Error creating a widget:', error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await WidgetService.remove(id);
      const updatedItems = widgets.filter(widget => widget._id !== id);
      setWidgets(updatedItems);
    } catch (error) {
      console.error('Error deleting a widget:', error);
    }
  };

  const setData = (data: IWidgetData) => {
    console.log(data)
    navigate("/edit", {state: data})
  }

  const clearForm = () => {
    setName('');
    setManufacturer('');
    setStock('')
  };

  return (
    <div>
      <div className='container'>
      <form className='my-form' onSubmit={createWidget}>
      <h2>Vorboss Warehouse App</h2>
        <div>
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <br/>
        <div>
            <label>Manufacturer</label>
            <input type="text" value={manufacturer} onChange={e => setManufacturer(e.target.value)}/>
        </div>
        <br/>
        <div>
            <label>Stock</label>
            <input type="number" min="0" value={stock} onChange={e => setStock(e.target.value)}/>
        </div>
        <br/>
        <button type="submit">Create</button>
      </form>
      </div>  
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {widgets.map(widget => (
            <tr key={widget._id}>
              <td>{widget.name}</td>
              <td>{widget.manufacturer}</td>
              <td>{widget.stock_level}</td>
              <td>
                <button onClick={() => setData(widget)}>Edit</button>
                <button onClick={() => deleteItem(widget._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default WidgetTable;
