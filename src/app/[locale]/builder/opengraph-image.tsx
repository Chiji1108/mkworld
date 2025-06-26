import { ImageResponse } from 'next/og';
import { 
  GROUPED_DRIVERS, 
  GROUPED_MACHINES, 
  type GroupedStats 
} from '@/lib/stats';
import { 
  getDriverTranslationKey,
  getMachineTranslationKey 
} from '@/lib/translation-helpers';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export const alt = 'MKWorld Tools - Custom Builder';

// Helper functions
const findDriverByKey = (key: string): GroupedStats | null => {
  if (!key || key === "") return null;
  return GROUPED_DRIVERS.find(driver => 
    driver.names.some(name => getDriverTranslationKey(name) === key)
  ) || null;
};

const findMachineByKey = (key: string): GroupedStats | null => {
  if (!key || key === "") return null;
  return GROUPED_MACHINES.find(machine => 
    machine.names.some(name => getMachineTranslationKey(name) === key)
  ) || null;
};

export default async function Image({ 
  searchParams 
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    // searchParamsをawaitして取得
    const params = await searchParams;
    
    // URLパラメータから選択状態を取得
    const driverKey = typeof params.driver === 'string' ? params.driver : '';
    const machineKey = typeof params.machine === 'string' ? params.machine : '';
    
    // デバッグ情報を画像に表示
    const debugInfo = `Params: ${JSON.stringify(params)} | Driver: ${driverKey} | Machine: ${machineKey}`;
    
    // デバッグモード：パラメータの詳細を表示
    if (driverKey === 'debug' || machineKey === 'debug') {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'system-ui, sans-serif',
              padding: '20px',
            }}
          >
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              DEBUG MODE
            </h1>
            <div
              style={{
                fontSize: '12px',
                color: 'white',
                textAlign: 'center',
                wordBreak: 'break-all',
                maxWidth: '1000px',
              }}
            >
              {debugInfo}
            </div>
          </div>
        ),
        {
          ...size,
        }
      );
    }
    
    const selectedDriver = findDriverByKey(driverKey);
    const selectedMachine = findMachineByKey(machineKey);
    
    console.log('Selected Driver:', selectedDriver?.names[0]);
    console.log('Selected Machine:', selectedMachine?.names[0]);

    // 合計性能を計算
    const getCombinedStats = () => {
      if (!selectedDriver || !selectedMachine) return null;
      
      return {
        speedHard: selectedDriver.speed.hard + selectedMachine.speed.hard,
        speedSoft: selectedDriver.speed.soft + selectedMachine.speed.soft,
        speedLiquid: selectedDriver.speed.liquid + selectedMachine.speed.liquid,
        acceleration: selectedDriver.acceleration + selectedMachine.acceleration,
        weight: selectedDriver.weight + selectedMachine.weight,
        handling: selectedDriver.handling + selectedMachine.handling,
      };
    };

    const combinedStats = getCombinedStats();
    const stats = combinedStats ? [
      { name: 'Speed (Hard)', value: combinedStats.speedHard, max: 20 },
      { name: 'Speed (Soft)', value: combinedStats.speedSoft, max: 20 },
      { name: 'Speed (Liquid)', value: combinedStats.speedLiquid, max: 20 },
      { name: 'Acceleration', value: combinedStats.acceleration, max: 20 },
      { name: 'Weight', value: combinedStats.weight, max: 20 },
      { name: 'Handling', value: combinedStats.handling, max: 20 },
    ] : [];

    const hasSelection = selectedDriver && selectedMachine;

    // デバッグ: 強制的に選択状態をtrueにしてテスト
    const testMode = driverKey === 'test' || machineKey === 'test';
    if (testMode) {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >
              TEST MODE: {driverKey} / {machineKey}
            </h1>
          </div>
        ),
        {
          ...size,
        }
      );
    }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '40px',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* タイトル */}
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Custom Builder
          </h1>

          {hasSelection ? (
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: '40px',
                alignItems: 'flex-start',
              }}
            >
              {/* 左側: 選択されたドライバー・マシン */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  flex: 1,
                }}
              >
                {/* ドライバー */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <h3
                    style={{
                      color: 'white',
                      fontSize: '18px',
                      marginBottom: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    Driver
                  </h3>
                  <div
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      textAlign: 'center',
                    }}
                  >
                    {selectedDriver.names.join(', ')}
                  </div>
                </div>

                {/* マシン */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <h3
                    style={{
                      color: 'white',
                      fontSize: '18px',
                      marginBottom: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    Machine
                  </h3>
                  <div
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      textAlign: 'center',
                    }}
                  >
                    {selectedMachine.names.join(', ')}
                  </div>
                </div>
              </div>

              {/* 右側: 性能グラフ */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  flex: 2,
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h3
                  style={{
                    color: 'white',
                    fontSize: '20px',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Total Performance
                </h3>
                
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        color: 'white',
                        fontSize: '14px',
                        minWidth: '140px',
                      }}
                    >
                      {stat.name}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: '20px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
                          width: `${(stat.value / stat.max) * 100}%`,
                          borderRadius: '10px',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        minWidth: '30px',
                        textAlign: 'right',
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <p
                style={{
                  fontSize: '24px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  marginBottom: '16px',
                }}
              >
                Create custom driver and machine combinations
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: 'center',
                }}
              >
                50 Drivers × 40 Machines
              </p>
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
  } catch (error) {
    // エラー時はエラー情報を含むシンプルな画像を返す
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            padding: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            MKWorld Tools
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
            }}
          >
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}