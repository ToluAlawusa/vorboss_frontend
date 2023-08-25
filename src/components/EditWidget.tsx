import React, { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WidgetService from '../services/WidgetService';
import IWidgetData from '../types/Widget';

const EditWidget: React.FC = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const [Name, setName] = useState('');
    const [Manufacturer, setManufacturer] = useState('');
    const [Stock, setStock] = useState(0);
    
    const [widgets, setWidgets] = useState<IWidgetData[]>([]);

    const updateWidget = async (e: FormEvent) => {
        var data = {
            name: Name,
            manufacturer: Manufacturer,
            stock_level: Stock
          };
        var currentWidget = location.state
        e.preventDefault()
        try {
          await WidgetService.update(currentWidget._id, data); // Change this to your API endpoint
          const updatedWidget = widgets.map(widget => (widget._id === currentWidget._id ? currentWidget : widget));
          setWidgets(updatedWidget);
          navigate("/");
        } catch (error) {
          console.error('Error updating widget:', error);
        }
    };
    return (
        <div className='container'>
            <form className='my-form' onSubmit={updateWidget}>
              <h2>Edit Widget</h2>
                <div>
                    <label>Name</label>
                    <input placeholder={location.state.name} value={Name} type="text" onChange={(e) => setName(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label>Manufacturer</label>
                    <input placeholder={location.state.manufacturer} value={Manufacturer} type="text" onChange={(e) => setManufacturer(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label>Stock</label>
                    <input type="number" value={Stock} placeholder={location.state.stock_level} onChange={(e) => setStock(parseInt(e.target.value))}/>
                </div>
                <br/>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default EditWidget;
