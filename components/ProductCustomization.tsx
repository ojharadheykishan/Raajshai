'use client';

import { useState, useEffect } from 'react';

interface CustomizationOptionValue {
  id: string;
  value: string;
  label: string;
  color_code?: string;
  image_url?: string;
  price_adjustment: number;
  in_stock: boolean;
  sort_order: number;
}

interface CustomizationOption {
  id: string;
  product_id: string;
  name: string;
  type: 'text' | 'select' | 'color' | 'image' | 'number';
  required: boolean;
  description?: string;
  min_value?: number;
  max_value?: number;
  max_length?: number;
  price_adjustment: number;
  sort_order: number;
  values: CustomizationOptionValue[];
}

interface CustomizationSelection {
  optionId: string;
  optionName: string;
  type: string;
  valueId?: string;
  valueLabel?: string;
  textValue?: string;
  numberValue?: number;
  priceAdjustment: number;
}

interface ProductCustomizationProps {
  productId: string;
  basePrice: number;
  onCustomizationChange: (selections: CustomizationSelection[], totalPrice: number) => void;
}

export default function ProductCustomization({
  productId,
  basePrice,
  onCustomizationChange
}: ProductCustomizationProps) {
  const [options, setOptions] = useState<CustomizationOption[]>([]);
  const [selections, setSelections] = useState<Record<string, CustomizationSelection>>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchOptions();
  }, [productId]);

  useEffect(() => {
    // Calculate total price and notify parent
    const selectionArray = Object.values(selections);
    const customizationTotal = selectionArray.reduce(
      (sum, sel) => sum + sel.priceAdjustment,
      0
    );
    const totalPrice = basePrice + customizationTotal;
    onCustomizationChange(selectionArray, totalPrice);
  }, [selections, basePrice]);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/customization?productId=${productId}`);
      const data = await response.json();
      setOptions(data.options || []);

      // Initialize selections with default values
      const initialSelections: Record<string, CustomizationSelection> = {};
      data.options?.forEach((option: CustomizationOption) => {
        if (option.type === 'select' || option.type === 'color' || option.type === 'image') {
          // Select first available value by default
          const firstAvailable = option.values.find(v => v.in_stock);
          if (firstAvailable) {
            initialSelections[option.id] = {
              optionId: option.id,
              optionName: option.name,
              type: option.type,
              valueId: firstAvailable.id,
              valueLabel: firstAvailable.label,
              priceAdjustment: option.price_adjustment + firstAvailable.price_adjustment
            };
          }
        } else if (option.type === 'text') {
          initialSelections[option.id] = {
            optionId: option.id,
            optionName: option.name,
            type: option.type,
            textValue: '',
            priceAdjustment: option.price_adjustment
          };
        } else if (option.type === 'number') {
          initialSelections[option.id] = {
            optionId: option.id,
            optionName: option.name,
            type: option.type,
            numberValue: option.min_value || 0,
            priceAdjustment: option.price_adjustment
          };
        }
      });
      setSelections(initialSelections);
    } catch (error) {
      console.error('Error fetching customization options:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (option: CustomizationOption, valueId: string) => {
    const selectedValue = option.values.find(v => v.id === valueId);
    if (!selectedValue) return;

    setSelections(prev => ({
      ...prev,
      [option.id]: {
        optionId: option.id,
        optionName: option.name,
        type: option.type,
        valueId: selectedValue.id,
        valueLabel: selectedValue.label,
        priceAdjustment: option.price_adjustment + selectedValue.price_adjustment
      }
    }));

    // Clear error if exists
    if (errors[option.id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[option.id];
        return newErrors;
      });
    }
  };

  const handleTextChange = (option: CustomizationOption, value: string) => {
    if (option.max_length && value.length > option.max_length) {
      return;
    }

    setSelections(prev => ({
      ...prev,
      [option.id]: {
        optionId: option.id,
        optionName: option.name,
        type: option.type,
        textValue: value,
        priceAdjustment: option.price_adjustment
      }
    }));

    // Clear error if exists
    if (errors[option.id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[option.id];
        return newErrors;
      });
    }
  };

  const handleNumberChange = (option: CustomizationOption, value: string) => {
    const numValue = parseFloat(value) || 0;
    
    // Validate range
    if (option.min_value !== undefined && numValue < option.min_value) {
      setErrors(prev => ({
        ...prev,
        [option.id]: `Minimum value is ${option.min_value}`
      }));
      return;
    }
    if (option.max_value !== undefined && numValue > option.max_value) {
      setErrors(prev => ({
        ...prev,
        [option.id]: `Maximum value is ${option.max_value}`
      }));
      return;
    }

    setSelections(prev => ({
      ...prev,
      [option.id]: {
        optionId: option.id,
        optionName: option.name,
        type: option.type,
        numberValue: numValue,
        priceAdjustment: option.price_adjustment
      }
    }));

    // Clear error if exists
    if (errors[option.id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[option.id];
        return newErrors;
      });
    }
  };

  const validateRequired = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    options.forEach(option => {
      if (option.required) {
        const selection = selections[option.id];
        if (!selection) {
          newErrors[option.id] = 'This option is required';
        } else if (option.type === 'text' && !selection.textValue?.trim()) {
          newErrors[option.id] = 'This field is required';
        } else if (option.type === 'number' && selection.numberValue === undefined) {
          newErrors[option.id] = 'This field is required';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-gray-200 rounded"></div>
        ))}
      </div>
    );
  }

  if (options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Customize Your Product</h3>
      
      {options.map(option => (
        <div key={option.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {option.name}
              {option.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {option.price_adjustment !== 0 && (
              <span className={`text-sm font-medium ${
                option.price_adjustment > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {option.price_adjustment > 0 ? '+' : ''}{option.price_adjustment}
              </span>
            )}
          </div>

          {option.description && (
            <p className="text-xs text-gray-500 mb-3">{option.description}</p>
          )}

          {/* Select/Dropdown */}
          {(option.type === 'select' || option.type === 'color' || option.type === 'image') && (
            <div className="space-y-2">
              {option.type === 'select' && (
                <select
                  value={selections[option.id]?.valueId || ''}
                  onChange={(e) => handleSelectChange(option, e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors[option.id] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select an option</option>
                  {option.values.map(value => (
                    <option
                      key={value.id}
                      value={value.id}
                      disabled={!value.in_stock}
                    >
                      {value.label}
                      {value.price_adjustment !== 0 && ` (${value.price_adjustment > 0 ? '+' : ''}${value.price_adjustment})`}
                      {!value.in_stock && ' - Out of Stock'}
                    </option>
                  ))}
                </select>
              )}

              {option.type === 'color' && (
                <div className="flex flex-wrap gap-2">
                  {option.values.map(value => (
                    <button
                      key={value.id}
                      type="button"
                      onClick={() => handleSelectChange(option, value.id)}
                      disabled={!value.in_stock}
                      className={`relative w-10 h-10 rounded-full border-2 transition ${
                        selections[option.id]?.valueId === value.id
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-300 hover:border-gray-400'
                      } ${!value.in_stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ backgroundColor: value.color_code }}
                      title={`${value.label}${value.price_adjustment !== 0 ? ` (${value.price_adjustment > 0 ? '+' : ''}${value.price_adjustment})` : ''}`}
                    >
                      {selections[option.id]?.valueId === value.id && (
                        <svg className="w-5 h-5 text-white absolute inset-0 m-auto drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {!value.in_stock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-0.5 bg-red-500 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {option.type === 'image' && (
                <div className="grid grid-cols-3 gap-3">
                  {option.values.map(value => (
                    <button
                      key={value.id}
                      type="button"
                      onClick={() => handleSelectChange(option, value.id)}
                      disabled={!value.in_stock}
                      className={`relative border-2 rounded-lg overflow-hidden transition ${
                        selections[option.id]?.valueId === value.id
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-300 hover:border-gray-400'
                      } ${!value.in_stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {value.image_url ? (
                        <img
                          src={value.image_url}
                          alt={value.label}
                          className="w-full h-20 object-cover"
                        />
                      ) : (
                        <div className="w-full h-20 bg-gray-100 flex items-center justify-center">
                          <span className="text-xs text-gray-500">No image</span>
                        </div>
                      )}
                      <div className="p-2 text-center">
                        <span className="text-xs font-medium text-gray-700">{value.label}</span>
                        {value.price_adjustment !== 0 && (
                          <span className={`block text-xs ${
                            value.price_adjustment > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {value.price_adjustment > 0 ? '+' : ''}{value.price_adjustment}
                          </span>
                        )}
                      </div>
                      {selections[option.id]?.valueId === value.id && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      {!value.in_stock && (
                        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                          <span className="text-xs font-medium text-red-600">Out of Stock</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {errors[option.id] && (
                <p className="text-xs text-red-500 mt-1">{errors[option.id]}</p>
              )}
            </div>
          )}

          {/* Text Input */}
          {option.type === 'text' && (
            <div>
              <input
                type="text"
                value={selections[option.id]?.textValue || ''}
                onChange={(e) => handleTextChange(option, e.target.value)}
                placeholder={`Enter ${option.name.toLowerCase()}`}
                maxLength={option.max_length}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors[option.id] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors[option.id] ? (
                  <p className="text-xs text-red-500">{errors[option.id]}</p>
                ) : (
                  <span></span>
                )}
                {option.max_length && (
                  <span className="text-xs text-gray-500">
                    {selections[option.id]?.textValue?.length || 0}/{option.max_length}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Number Input */}
          {option.type === 'number' && (
            <div>
              <input
                type="number"
                value={selections[option.id]?.numberValue ?? ''}
                onChange={(e) => handleNumberChange(option, e.target.value)}
                placeholder={`Enter ${option.name.toLowerCase()}`}
                min={option.min_value}
                max={option.max_value}
                step="1"
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors[option.id] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {(option.min_value !== undefined || option.max_value !== undefined) && (
                <p className="text-xs text-gray-500 mt-1">
                  Range: {option.min_value || 0} - {option.max_value || '∞'}
                </p>
              )}
              {errors[option.id] && (
                <p className="text-xs text-red-500 mt-1">{errors[option.id]}</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Customization Total:</span>
          <span className="text-lg font-semibold text-gray-900">
            +{Object.values(selections).reduce((sum, sel) => sum + sel.priceAdjustment, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
