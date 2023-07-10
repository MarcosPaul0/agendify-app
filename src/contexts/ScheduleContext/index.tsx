import { createContext, useContext, useMemo, useState } from 'react';
import { IScheduleContextProviderProps } from './interfaces/scheduleContextProviderProps.interface';
import { IScheduleContextData } from './interfaces/scheduleContextData.interface';
import { ISchedule } from './interfaces/schedule.interface';
import { IScheduleOperation } from './interfaces/scheduleOperation.interface';

const ScheduleContext = createContext({} as IScheduleContextData);

export function ScheduleContextProvider({
  children,
}: IScheduleContextProviderProps) {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);

  const totalTime = useMemo(
    () =>
      schedule.reduce(
        (totalTimeAccumulator, schedule) =>
          totalTimeAccumulator + schedule.timeInMinutes * schedule.count,
        0
      ),
    [schedule]
  );

  function incrementScheduledService({
    serviceId,
    name,
    timeInMinutes,
    price,
  }: IScheduleOperation) {
    const serviceAlreadyExists = schedule.find(
      (schedule) => schedule.serviceId === serviceId
    );

    if (serviceAlreadyExists) {
      setSchedule((scheduleState) =>
        scheduleState.map((schedule) => {
          if (schedule.serviceId === serviceId) {
            return { ...schedule, count: schedule.count + 1 };
          }

          return schedule;
        })
      );
    } else {
      setSchedule((scheduleState) => [
        ...scheduleState,
        {
          count: 1,
          name,
          serviceId,
          timeInMinutes,
          price,
        },
      ]);
    }
  }

  function decrementScheduledService(serviceId: string) {
    const serviceAlreadyExists = schedule.find(
      (schedule) => schedule.serviceId === serviceId
    );

    if (serviceAlreadyExists) {
      if (serviceAlreadyExists.count - 1 === 0) {
        setSchedule((scheduleState) =>
          scheduleState.filter((schedule) => schedule.serviceId !== serviceId)
        );
      } else {
        setSchedule((scheduleState) =>
          scheduleState.map((schedule) => {
            if (schedule.serviceId === serviceId) {
              return { ...schedule, count: schedule.count - 1 };
            }

            return schedule;
          })
        );
      }
    }
  }

  function clearScheduledServices() {
    setSchedule([]);
  }

  return (
    <ScheduleContext.Provider
      value={{
        schedule,
        totalTime,
        incrementScheduledService,
        decrementScheduledService,
        clearScheduledServices,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export const useScheduleContext = () => useContext(ScheduleContext);
