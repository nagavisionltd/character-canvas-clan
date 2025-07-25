import { useState, useEffect, useCallback } from 'react';

export type AttackType = 'punch' | 'combo' | 'kick' | 'block' | null;

export interface AttackState {
  currentAttack: AttackType;
  isAttacking: boolean;
  attackFrame: number;
  comboCount: number;
  lastAttackTime: number;
}

const ATTACK_DURATIONS = {
  punch: 300,
  combo: 200,
  kick: 500,
  block: 400,
};

const COMBO_WINDOW = 500; // ms window to chain combos

export const useAttacks = () => {
  const [attackState, setAttackState] = useState<AttackState>({
    currentAttack: null,
    isAttacking: false,
    attackFrame: 0,
    comboCount: 0,
    lastAttackTime: 0,
  });

  // Clear attack after duration
  useEffect(() => {
    if (!attackState.isAttacking || !attackState.currentAttack) return;

    const duration = ATTACK_DURATIONS[attackState.currentAttack];
    const timeout = setTimeout(() => {
      setAttackState(prev => ({
        ...prev,
        isAttacking: false,
        currentAttack: null,
        attackFrame: 0,
      }));
    }, duration);

    return () => clearTimeout(timeout);
  }, [attackState.isAttacking, attackState.currentAttack]);

  const executeAttack = useCallback((attackType: AttackType) => {
    if (!attackType || attackState.isAttacking) return;

    const now = Date.now();
    const timeSinceLastAttack = now - attackState.lastAttackTime;
    
    // Handle combo logic for punch
    if (attackType === 'punch' && timeSinceLastAttack < COMBO_WINDOW && attackState.comboCount > 0) {
      setAttackState(prev => ({
        currentAttack: 'combo',
        isAttacking: true,
        attackFrame: 0,
        comboCount: prev.comboCount + 1,
        lastAttackTime: now,
      }));
    } else {
      setAttackState({
        currentAttack: attackType,
        isAttacking: true,
        attackFrame: 0,
        comboCount: attackType === 'punch' ? 1 : 0,
        lastAttackTime: now,
      });
    }
  }, [attackState.isAttacking, attackState.lastAttackTime, attackState.comboCount]);

  const resetCombo = useCallback(() => {
    setAttackState(prev => ({
      ...prev,
      comboCount: 0,
    }));
  }, []);

  return {
    attackState,
    executeAttack,
    resetCombo,
  };
};