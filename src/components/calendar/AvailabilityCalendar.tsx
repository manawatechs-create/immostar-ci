'use client'

import { useState, useEffect } from 'react'
import { DateRangePicker } from 'react-date-range'
import { addDays, format, isWeekend, isSameDay } from 'date-fns'
import { fr } from 'date-fns/locale'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { FaCalendarCheck, FaCalendarTimes, FaDollarSign } from 'react-icons/fa'

interface AvailabilityCalendarProps {
  propertyId: string
  isOwner?: boolean
  onDateSelect?: (dates: { startDate: Date; endDate: Date }) => void
  onPriceUpdate?: (date: Date, price: number) => void
}

export function AvailabilityCalendar({ 
  propertyId, 
  isOwner = false,
  onDateSelect,
  onPriceUpdate 
}: AvailabilityCalendarProps) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'selection',
    }
  ])
  const [blockedDates, setBlockedDates] = useState<Date[]>([])
  const [specialPrices, setSpecialPrices] = useState<Record<string, number>>({})
  const [showPriceModal, setShowPriceModal] = useState(false)
  const [selectedDateForPrice, setSelectedDateForPrice] = useState<Date | null>(null)
  const [customPrice, setCustomPrice] = useState('')

  // Simuler les dates bloquées
  useEffect(() => {
    const blocked = [
      addDays(new Date(), 5),
      addDays(new Date(), 6),
      addDays(new Date(), 12),
      addDays(new Date(), 13),
    ]
    setBlockedDates(blocked)
  }, [])

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection])
    if (onDateSelect && ranges.selection.startDate && ranges.selection.endDate) {
      onDateSelect({
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
      })
    }
  }

  const handleDateClick = (date: Date) => {
    if (isOwner) {
      setSelectedDateForPrice(date)
      setCustomPrice(specialPrices[format(date, 'yyyy-MM-dd')]?.toString() || '')
      setShowPriceModal(true)
    }
  }

  const saveCustomPrice = () => {
    if (selectedDateForPrice && customPrice) {
      const dateKey = format(selectedDateForPrice, 'yyyy-MM-dd')
      setSpecialPrices({
        ...specialPrices,
        [dateKey]: parseInt(customPrice),
      })
      if (onPriceUpdate) {
        onPriceUpdate(selectedDateForPrice, parseInt(customPrice))
      }
      setShowPriceModal(false)
    }
  }

  const dayContentRenderer = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    const isBlocked = blockedDates.some(d => isSameDay(d, date))
    const hasSpecialPrice = specialPrices[dateKey]

    return (
      <div className="relative">
        <span>{format(date, 'd')}</span>
        {hasSpecialPrice && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <span className="text-[8px] text-orange-600 font-bold">
              {hasSpecialPrice.toLocaleString()}F
            </span>
          </div>
        )}
        {isBlocked && (
          <div className="absolute inset-0 bg-red-100 rounded-full opacity-50"></div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaCalendarCheck className="text-orange-500" />
        Calendrier des disponibilités
      </h3>

      {/* Légende */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-gray-600">Disponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-gray-600">Indisponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
          <span className="text-gray-600">Tarif spécial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span className="text-gray-600">Sélection</span>
        </div>
      </div>

      {/* Calendrier */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <DateRangePicker
          onChange={handleSelect}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={dateRange}
          direction="horizontal"
          locale={fr}
          rangeColors={['#f97316']}
          disabledDates={blockedDates}
          minDate={new Date()}
          dayContentRenderer={isOwner ? dayContentRenderer : undefined}
          className="w-full"
        />
      </div>

      {/* Résumé de la sélection */}
      {dateRange[0].startDate && dateRange[0].endDate && (
        <div className="mt-4 p-4 bg-orange-50 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div>
              <div className="text-sm text-gray-600">Arrivée</div>
              <div className="font-semibold">
                {format(dateRange[0].startDate, 'EEEE d MMMM yyyy', { locale: fr })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Départ</div>
              <div className="font-semibold">
                {format(dateRange[0].endDate, 'EEEE d MMMM yyyy', { locale: fr })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Durée</div>
              <div className="font-semibold">
                {Math.ceil((dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) / (1000 * 60 * 60 * 24))} nuits
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour définir un prix spécial */}
      {showPriceModal && selectedDateForPrice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
            <h4 className="text-lg font-bold mb-4">
              Tarif spécial pour le {format(selectedDateForPrice, 'd MMMM yyyy', { locale: fr })}
            </h4>
            <div className="flex items-center gap-2 mb-4">
              <FaDollarSign className="text-orange-500" />
              <input
                type="number"
                placeholder="Prix en FCFA"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-gray-500">FCFA</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={saveCustomPrice}
                className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl font-semibold"
              >
                Enregistrer
              </button>
              <button
                onClick={() => setShowPriceModal(false)}
                className="flex-1 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bouton pour les propriétaires */}
      {isOwner && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            💡 Cliquez sur une date pour définir un tarif spécial
          </p>
        </div>
      )}
    </div>
  )
}
