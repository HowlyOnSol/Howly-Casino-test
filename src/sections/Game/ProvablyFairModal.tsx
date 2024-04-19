import { useGamba, useGambaProgram, useSendTransaction } from 'gamba-react-v2'
import { GambaPlatformContext, GambaUi } from 'gamba-react-ui-v2'
import React, { useState } from 'react'
import { Icon } from '../../components/Icon'
import { Modal } from '../../components/Modal'

const coinFlipOutcomes = ["heads", "tails", "heads", "tails"]; // Replace with your desired sequence

export function ProvablyFairModal(props: { onClose: () => void }) {
  const gamba = useGamba()
  const platform = React.useContext(GambaPlatformContext)
  const [initializing, setInitializing] = useState(false)
  const [outcomeIndex, setOutcomeIndex] = useState(0); // Track outcome sequence position

  const initialize = async () => {
    try {
      setInitializing(true)
      // No need to call program methods for predefined outcomes
      gamba.nextRngSeedHashed = coinFlipOutcomes[outcomeIndex];
      setOutcomeIndex((prevIndex) => (prevIndex + 1) % coinFlipOutcomes.length); // Update for next call
    } finally {
      setInitializing(false)
    }
  }

  return (
    <Modal onClose={() => props.onClose()}>
      <h1>Provably Fair (Simulated)</h1>
      <p>
        This is a simulated Provably Fair experience. The outcome is predetermined for demonstration purposes.
      </p>
      <div style={{ display: 'grid', gap: '10px', width: '100%', padding: '20px' }}>
        <div>Next Coin Flip</div>
        <GambaUi.TextInput
          value={gamba.nextRngSeedHashed ?? ''}
          disabled
        />
        {/* Remove client seed input and related logic for predetermined outcomes */}
      </div>
      <GambaUi.Button main disabled={initializing} onClick={initialize}>
        Start Simulated Flip
      </GambaUi.Button>
    </Modal>
  )
}
