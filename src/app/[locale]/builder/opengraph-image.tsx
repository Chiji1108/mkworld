import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { 
  GROUPED_DRIVERS, 
  GROUPED_MACHINES, 
  type GroupedStats 
} from '@/lib/stats';
import { 
  translateDriverName, 
  translateMachineName,
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
  params,
  searchParams,
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const search = await searchParams;
  const t = await getTranslations({ locale, namespace: '' });

  // URLパラメータから選択状態を取得
  const driverKey = typeof search.driver === 'string' ? search.driver : '';
  const machineKey = typeof search.machine === 'string' ? search.machine : '';
  
  const selectedDriver = findDriverByKey(driverKey);
  const selectedMachine = findMachineByKey(machineKey);

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
    { name: t('stats.speedHard'), value: combinedStats.speedHard, max: 20 },
    { name: t('stats.speedSoft'), value: combinedStats.speedSoft, max: 20 },
    { name: t('stats.speedLiquid'), value: combinedStats.speedLiquid, max: 20 },
    { name: t('stats.acceleration'), value: combinedStats.acceleration, max: 20 },
    { name: t('stats.weight'), value: combinedStats.weight, max: 20 },
    { name: t('stats.handling'), value: combinedStats.handling, max: 20 },
  ] : [];

  const hasSelection = selectedDriver && selectedMachine;

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
            {t('builder.pageTitle')}
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
                    {t('stats.driver')}
                  </h3>
                  <div
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      textAlign: 'center',
                    }}
                  >
                    {selectedDriver.names.map(name => 
                      translateDriverName(name, (key: string) => t(key))
                    ).join(', ')}
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
                    {t('stats.machine')}
                  </h3>
                  <div
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      textAlign: 'center',
                    }}
                  >
                    {selectedMachine.names.map(name => 
                      translateMachineName(name, (key: string) => t(key))
                    ).join(', ')}
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
                  {t('builder.statsDisplay.title')}
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
                {t('builder.description')}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: 'center',
                }}
              >
                50 {t('stats.driver')} × 40 {t('stats.machine')}
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
}