export interface CareInstruction {
  wateringFrequency?: string;
  wateringTips?: string;
  sunlightNeeds?: string;
  sunlightTolerance?: string;
  soilType?: string;
  pruningSeason?: string;
  fertilizingFrequency?: string;
  propagationMethod?: string;
  repottingSeason?: string;
  advantages?: string[];
}

export interface ToxicityInfo {
  toxicToHumans?: boolean;
  humanToxicIf?: string;
  humanToxicParts?: string;
  humanToxicityDetail?: string;
  toxicToDogs?: boolean;
  dogToxicIf?: string;
  dogToxicParts?: string;
  dogToxicityDetail?: string;
  toxicToCats?: boolean;
  catToxicIf?: string;
  catToxicParts?: string;
  catToxicityDetail?: string;
}

export interface CommonProblem {
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface PlantDTO {
  id: number;
  scientificName: string;
  commonName: string;
  description?: string;
  heightRange?: string;
  spreadRange?: string;
  leafType?: string;
  plantingSeason?: string;
  difficultyLevel?: string;
  resistanceLevel?: string;
  maintenanceLevel?: string;
  temperatureRange?: string;
  hardinessZone?: string;
  usages?: string;
  adaptationStrategies?: string;
  historyLegend?: string;
  nameHistory?: string;
  symbolism?: string;
  careInstruction?: CareInstruction;
  toxicityInfo?: ToxicityInfo;
  commonProblems?: CommonProblem[];
}