'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/Button';
import { ChocolateCoinIcon, FactoryIcon } from '@/components/icons';
import type { FactoryItem } from '@/types';

export default function EconomySettingsPage() {
  const router = useRouter();
  const { currentUser, family, updateFamilySettings } = useStore();
  
  const [chokladpengValue, setChokladpengValue] = useState(1);
  const [allowCustomFactories, setAllowCustomFactories] = useState(false);
  const [customFactories, setCustomFactories] = useState<FactoryItem[]>([]);
  
  // Formulär för ny fabrik
  const [newFactory, setNewFactory] = useState({
    name: '',
    description: '',
    cost: 100,
    productionRate: 5,
    maintenanceCost: 10,
    icon: '🏭',
  });
  
  useEffect(() => {
    if (family?.settings) {
      setChokladpengValue(family.settings.chokladpengValue);
      setAllowCustomFactories(family.settings.allowCustomFactories);
      setCustomFactories(family.settings.customFactories || []);
    }
  }, [family]);
  
  if (!currentUser || currentUser.role !== 'parent' || !family) {
    router.push('/');
    return null;
  }
  
  const handleSaveSettings = async () => {
    try {
      await updateFamilySettings({
        chokladpengValue,
        allowCustomFactories,
        customFactories,
      });
      alert('Inställningar sparade!');
    } catch (err) {
      alert('Kunde inte spara inställningar');
    }
  };
  
  const handleAddFactory = () => {
    if (!newFactory.name) {
      alert('Ange namn på fabriken');
      return;
    }
    
    const factory: FactoryItem = {
      id: `custom_${Date.now()}`,
      name: newFactory.name,
      description: newFactory.description,
      cost: newFactory.cost,
      productionRate: newFactory.productionRate,
      maintenanceCost: newFactory.maintenanceCost,
      icon: newFactory.icon,
      level: customFactories.length + 1,
    };
    
    setCustomFactories([...customFactories, factory]);
    
    // Återställ formulär
    setNewFactory({
      name: '',
      description: '',
      cost: 100,
      productionRate: 5,
      maintenanceCost: 10,
      icon: '🏭',
    });
  };
  
  const handleRemoveFactory = (id: string) => {
    setCustomFactories(customFactories.filter(f => f.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-nougat-light to-white-chocolate p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-chocolate-milk hover:text-chocolate-dark mb-4 font-medium"
          >
            ← Tillbaka
          </button>
          <h1 className="text-3xl font-bold text-chocolate-dark">Ekonomiska inställningar</h1>
          <p className="text-chocolate-milk mt-1">Hantera priser och värden i familjen</p>
        </div>
        
        {/* Chokladpeng-värde */}
        <div className="card-glass mb-6">
          <h2 className="text-xl font-bold text-chocolate-dark mb-4 flex items-center gap-2">
            <ChocolateCoinIcon size={24} color="#D4AF37" />
            Chokladpengens värde
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-chocolate-dark mb-2">
              1 chokladpeng = ? kronor
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={chokladpengValue}
                onChange={(e) => setChokladpengValue(Number(e.target.value))}
                min={0.1}
                step={0.1}
                className="input-chocolate w-32"
              />
              <span className="text-chocolate-dark font-medium">kr</span>
            </div>
            <p className="text-xs text-chocolate-milk mt-2">
              Detta gör det lättare att sätta realistiska priser på belöningar och uppgifter
            </p>
          </div>
          
          <div className="bg-nougat-light/50 rounded-2xl p-4 border-2 border-nougat-gold/30">
            <p className="text-sm font-medium text-chocolate-dark mb-2">Exempel:</p>
            <div className="space-y-1 text-sm text-chocolate-medium">
              <div className="flex justify-between">
                <span>10 chokladpengar =</span>
                <span className="font-bold">{(10 * chokladpengValue).toFixed(2)} kr</span>
              </div>
              <div className="flex justify-between">
                <span>50 chokladpengar =</span>
                <span className="font-bold">{(50 * chokladpengValue).toFixed(2)} kr</span>
              </div>
              <div className="flex justify-between">
                <span>100 chokladpengar =</span>
                <span className="font-bold">{(100 * chokladpengValue).toFixed(2)} kr</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Anpassade fabriker */}
        <div className="card-glass mb-6">
          <h2 className="text-xl font-bold text-chocolate-dark mb-4 flex items-center gap-2">
            <FactoryIcon size={24} color="#6B4423" />
            Anpassade fabriker
          </h2>
          
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allowCustomFactories}
                onChange={(e) => setAllowCustomFactories(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-chocolate-light/30"
              />
              <span className="text-chocolate-dark font-medium">
                Tillåt anpassade fabriker
              </span>
            </label>
            <p className="text-xs text-chocolate-milk mt-1 ml-7">
              Skapa egna fabriker med egna priser och produktionshastighet
            </p>
          </div>
          
          {allowCustomFactories && (
            <>
              {/* Befintliga anpassade fabriker */}
              {customFactories.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-chocolate-dark mb-3">Dina fabriker:</h3>
                  <div className="space-y-2">
                    {customFactories.map((factory) => (
                      <div key={factory.id} className="bg-white rounded-2xl p-4 border border-chocolate-light/20">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="text-3xl">{factory.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-chocolate-dark">{factory.name}</h4>
                              <p className="text-sm text-chocolate-milk">{factory.description}</p>
                              <div className="flex gap-4 mt-2 text-xs text-chocolate-medium">
                                <span>Kostnad: {factory.cost}</span>
                                <span>Produktion: {factory.productionRate}/h</span>
                                <span>Underhåll: {factory.maintenanceCost}/vecka</span>
                              </div>
                              <p className="text-xs text-nougat-gold font-medium mt-1">
                                ≈ {(factory.cost * chokladpengValue).toFixed(2)} kr
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFactory(factory.id)}
                            className="text-red-500 hover:text-red-700 text-xl p-2 font-bold leading-none"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Lägg till ny fabrik */}
              <div className="bg-nougat-light/30 rounded-2xl p-4 border-2 border-nougat-gold/20">
                <h3 className="font-medium text-chocolate-dark mb-3">Skapa ny fabrik:</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-chocolate-dark mb-1">
                      Fabrikens namn
                    </label>
                    <input
                      type="text"
                      value={newFactory.name}
                      onChange={(e) => setNewFactory({...newFactory, name: e.target.value})}
                      placeholder="T.ex. Liten Kakaokvarn"
                      className="input-chocolate text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-chocolate-dark mb-1">
                      Beskrivning
                    </label>
                    <input
                      type="text"
                      value={newFactory.description}
                      onChange={(e) => setNewFactory({...newFactory, description: e.target.value})}
                      placeholder="Producerar 5 chokladpengar/timme"
                      className="input-chocolate text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-chocolate-dark mb-1">
                        Kostnad
                      </label>
                      <input
                        type="number"
                        value={newFactory.cost}
                        onChange={(e) => setNewFactory({...newFactory, cost: Number(e.target.value)})}
                        min={1}
                        className="input-chocolate text-sm"
                      />
                      <p className="text-xs text-nougat-gold mt-1">
                        ≈ {(newFactory.cost * chokladpengValue).toFixed(2)} kr
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-chocolate-dark mb-1">
                        Produktion/h
                      </label>
                      <input
                        type="number"
                        value={newFactory.productionRate}
                        onChange={(e) => setNewFactory({...newFactory, productionRate: Number(e.target.value)})}
                        min={1}
                        className="input-chocolate text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-chocolate-dark mb-1">
                        Underhåll/v
                      </label>
                      <input
                        type="number"
                        value={newFactory.maintenanceCost}
                        onChange={(e) => setNewFactory({...newFactory, maintenanceCost: Number(e.target.value)})}
                        min={1}
                        className="input-chocolate text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-chocolate-dark mb-1">
                      Ikon (emoji)
                    </label>
                    <input
                      type="text"
                      value={newFactory.icon}
                      onChange={(e) => setNewFactory({...newFactory, icon: e.target.value})}
                      maxLength={2}
                      className="input-chocolate text-sm w-20 text-center text-2xl"
                    />
                  </div>
                  
                  <Button onClick={handleAddFactory} variant="primary" size="sm" fullWidth>
                    Lägg till fabrik
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Spara */}
        <div className="space-y-2">
          <Button onClick={handleSaveSettings} variant="primary" size="lg" fullWidth>
            Spara inställningar
          </Button>
          
          <Button onClick={() => router.back()} variant="ghost" size="md" fullWidth>
            Avbryt
          </Button>
        </div>
      </div>
    </div>
  );
}



