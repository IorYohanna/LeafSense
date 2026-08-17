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
}

export interface ToxicityInfo {
  toxicToHumans?: boolean;
  humanToxicityDetail?: string;
  toxicToDogs?: boolean;
  dogToxicityDetail?: string;
  toxicToCats?: boolean;
  catToxicityDetail?: string;
  toxicParts?: string;
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
  careInstruction?: CareInstruction;
  toxicityInfo?: ToxicityInfo;
  commonProblems?: CommonProblem[];
}