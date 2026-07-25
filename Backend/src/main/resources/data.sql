-- ============================================
-- PLANTES (15 espèces - labels.txt mis à jour)
-- ============================================

INSERT INTO plants (scientific_name, common_name, description, height_range, spread_range, leaf_type, planting_season, difficulty_level, resistance_level, maintenance_level, temperature_range, hardiness_zone)
VALUES
('Monstera deliciosa', 'Monstera', 'Plante d''intérieur emblématique reconnaissable à ses grandes feuilles perforées.', '1 m à 3 m en intérieur', '1 m à 2 m', 'Feuilles persistantes perforées', 'Printemps', 'Facile', 'Élevé', 'Faible', '18 à 27°C', '10-12'),
('Maranta leuconeura', 'Plante prière', 'Plante décorative dont les feuilles se replient le soir comme des mains en prière.', '30 cm à 40 cm', '30 cm à 40 cm', 'Feuilles persistantes marbrées', 'Printemps', 'Modéré', 'Faible', 'Élevé', '18 à 24°C', '11-12'),
('Pilea peperomioides', 'Plante à monnaie chinoise', 'Petite plante ronde très tendance, facile à bouturer et à partager.', '20 cm à 40 cm', '20 cm à 30 cm', 'Feuilles persistantes rondes', 'Printemps', 'Facile', 'Moyen', 'Faible', '15 à 24°C', '10-11'),
('Ficus elastica', 'Figuier caoutchouc', 'Grande plante d''intérieur au feuillage épais et brillant, facile à vivre.', '1 m à 3 m en intérieur', '60 cm à 1.5 m', 'Feuilles persistantes épaisses', 'Printemps', 'Facile', 'Élevé', 'Faible', '16 à 29°C', '10-11'),
('Aloe vera', 'Aloe vera', 'Succulente aux propriétés apaisantes, très facile d''entretien, adore le plein soleil.', '30 cm à 60 cm', '30 cm à 60 cm', 'Feuilles persistantes charnues', 'Printemps, Été', 'Facile', 'Élevé', 'Très faible', '13 à 27°C', '9-11'),
('Calathea lancifolia', 'Calathea', 'Plante ornementale au feuillage très décoratif, nécessite une bonne humidité ambiante.', '40 cm à 70 cm', '30 cm à 50 cm', 'Feuilles persistantes rayées', 'Printemps', 'Modéré', 'Faible', 'Élevé', '18 à 26°C', '10-12'),
('Zamioculcas zamiifolia', 'Zamioculcas / Plante ZZ', 'Plante extrêmement résistante, tolère la négligence et la faible lumière.', '45 cm à 90 cm', '45 cm à 60 cm', 'Feuilles persistantes brillantes', 'Toute l''année', 'Facile', 'Très élevé', 'Très faible', '18 à 26°C', '9-11'),
('Schlumbergera bridgesii', 'Cactus de Noël', 'Cactus d''intérieur qui fleurit en hiver, contrairement aux cactus classiques il aime l''humidité.', '30 cm à 50 cm', '30 cm à 60 cm', 'Tiges segmentées charnues', 'Automne', 'Modéré', 'Moyen', 'Moyen', '18 à 24°C', '10-12'),
('Saintpaulia ionantha', 'Violette africaine', 'Petite plante à fleurs, sensible à l''excès d''eau sur les feuilles.', '10 cm à 20 cm', '15 cm à 30 cm', 'Feuilles persistantes duveteuses', 'Toute l''année', 'Modéré', 'Faible', 'Élevé', '18 à 24°C', '11-12'),
('Dieffenbachia seguine', 'Dieffenbachia', 'Grande plante d''intérieur au feuillage panaché, sève irritante.', '60 cm à 1.8 m', '45 cm à 90 cm', 'Feuilles persistantes panachées', 'Printemps', 'Facile', 'Moyen', 'Faible', '18 à 27°C', '10-12'),
('Nephrolepis exaltata', 'Fougère de Boston', 'Fougère retombante appréciant l''humidité, feuillage léger et abondant.', '60 cm à 90 cm', '60 cm à 90 cm', 'Feuilles persistantes en frondes', 'Printemps', 'Modéré', 'Moyen', 'Élevé', '16 à 24°C', '9-11'),
('Convallaria majalis', 'Muguet', 'Petite plante à fleurs blanches parfumées, pousse en sous-bois, fleurit au printemps.', '15 cm à 30 cm', '20 cm à 40 cm', 'Feuilles caduques lancéolées', 'Automne', 'Facile', 'Élevé', 'Faible', '-10 à 24°C', '3-8'),
('Crassula ovata', 'Arbre de jade', 'Succulente populaire au tronc ligneux, symbole de chance et de prospérité.', '30 cm à 1 m', '30 cm à 60 cm', 'Feuilles persistantes charnues', 'Printemps, Été', 'Facile', 'Élevé', 'Faible', '10 à 35°C', '9-11'),
('Anthurium andraeanum', 'Anthurium', 'Plante à fleurs colorées en forme de cœur, apprécie la chaleur et l''humidité.', '30 cm à 60 cm', '30 cm à 45 cm', 'Feuilles persistantes brillantes', 'Toute l''année', 'Modéré', 'Moyen', 'Moyen', '18 à 27°C', '11-12'),
('Chamaedorea elegans', 'Palmier nain', 'Petit palmier d''intérieur, tolère la faible luminosité, facile à vivre.', '60 cm à 1.8 m', '60 cm à 1 m', 'Feuilles persistantes pennées', 'Printemps', 'Facile', 'Élevé', 'Faible', '18 à 26°C', '10-12');

-- ============================================
-- FICHES DE SOINS
-- ============================================

INSERT INTO care_instructions (plant_id, watering_frequency, watering_tips, sunlight_needs, sunlight_tolerance, soil_type, pruning_season, fertilizing_frequency, propagation_method, repotting_season)
VALUES
(1, 'Une fois par semaine', 'Laissez sécher les 2-3 premiers cm de terre entre les arrosages.', 'Lumière indirecte vive', 'Mi-ombre tolérée', 'Terreau riche et bien drainé', 'Printemps', 'Une fois par mois en croissance', 'Bouturage de tige avec nœud aérien', 'Printemps, tous les 2 ans'),
(2, '2 fois par semaine', 'Aime l''humidité constante, éviter l''eau calcaire qui tache les feuilles.', 'Lumière indirecte moyenne', 'Ombre partielle tolérée', 'Terreau riche et humide', 'Printemps', 'Une fois par mois en croissance', 'Division de touffe', 'Printemps'),
(3, 'Toutes les 1-2 semaines', 'Laissez sécher le sol entre deux arrosages, tourner régulièrement vers la lumière.', 'Lumière indirecte vive', 'Mi-ombre tolérée', 'Terreau universel bien drainé', 'Rarement nécessaire', 'Une fois par mois en croissance', 'Prélèvement des rejets à la base', 'Printemps'),
(4, 'Toutes les 1-2 semaines', 'Essuyez les feuilles régulièrement pour la photosynthèse.', 'Lumière indirecte vive', 'Plein soleil filtré toléré', 'Terreau riche bien drainé', 'Printemps', 'Une fois par mois en croissance', 'Bouturage de tige', 'Printemps, tous les 2 ans'),
(5, 'Toutes les 2-3 semaines', 'Arrosage profond mais espacé, typique des succulentes.', 'Plein soleil', 'Mi-ombre tolérée', 'Terreau pour cactus/succulentes', 'Rarement nécessaire', 'Une fois tous les 2 mois en été', 'Séparation des rejets', 'Printemps'),
(6, '2 fois par semaine', 'Aime l''humidité constante mais pas l''eau stagnante, sensible à l''eau calcaire.', 'Lumière indirecte moyenne', 'Ombre partielle tolérée', 'Terreau riche et humide', 'Printemps', 'Une fois par mois en croissance', 'Division de touffe', 'Printemps'),
(7, 'Toutes les 2-3 semaines', 'Très tolérante à la sécheresse, éviter l''excès d''eau qui pourrit les rhizomes.', 'Lumière indirecte à faible', 'Faible luminosité tolérée', 'Terreau bien drainé', 'Rarement nécessaire', 'Une fois tous les 2 mois', 'Division de rhizome', 'Printemps, tous les 2-3 ans'),
(8, 'Une fois par semaine', 'Réduire l''arrosage après la floraison pour une période de repos.', 'Lumière indirecte vive', 'Mi-ombre tolérée', 'Terreau bien drainé et léger', 'Après floraison', 'Toutes les 2 semaines pendant la floraison', 'Bouturage de segment', 'Après floraison'),
(9, 'Toutes les 1-2 semaines', 'Arroser par le dessous pour éviter de mouiller les feuilles duveteuses.', 'Lumière indirecte vive', 'Faible luminosité tolérée', 'Terreau léger et bien drainé', 'Retirer feuilles fanées', 'Toutes les 2 semaines avec engrais dilué', 'Bouturage de feuille', 'Selon besoin'),
(10, 'Toutes les 1-2 semaines', 'Attention, la sève est irritante pour la peau et les muqueuses.', 'Lumière indirecte vive', 'Faible luminosité tolérée', 'Terreau riche bien drainé', 'Printemps', 'Une fois par mois en croissance', 'Bouturage de tige', 'Printemps, tous les 2 ans'),
(11, '2-3 fois par semaine', 'Nécessite une bonne humidité ambiante, vaporiser régulièrement.', 'Lumière indirecte moyenne', 'Ombre partielle tolérée', 'Terreau riche et humide', 'Retirer frondes mortes', 'Une fois par mois en croissance', 'Division de touffe', 'Printemps'),
(12, 'Une fois par semaine', 'Garder le sol légèrement humide, apprécie la fraîcheur.', 'Ombre à mi-ombre', 'Lumière indirecte tolérée', 'Terreau riche en humus', 'Après floraison', 'Une fois au printemps', 'Division des rhizomes/griffes', 'Automne'),
(13, 'Toutes les 2-3 semaines', 'Mieux vaut sous-arroser que sur-arroser, typique des succulentes.', 'Plein soleil', 'Mi-ombre tolérée', 'Terreau pour cactus/succulentes', 'Printemps pour la forme', 'Une fois tous les 2 mois en été', 'Bouturage de feuille ou de tige', 'Printemps, tous les 2 ans'),
(14, '2 fois par semaine', 'Aime l''humidité, éviter l''eau calcaire qui tache les feuilles.', 'Lumière indirecte vive', 'Ombre partielle tolérée', 'Terreau riche et aéré', 'Retirer fleurs fanées', 'Toutes les 2 semaines en croissance', 'Division de touffe', 'Printemps'),
(15, 'Une fois par semaine', 'Tolère la sécheresse occasionnelle, éviter le plein soleil direct qui brûle les feuilles.', 'Lumière indirecte moyenne', 'Faible luminosité tolérée', 'Terreau riche bien drainé', 'Retirer feuilles jaunies', 'Une fois par mois en croissance', 'Division de touffe, semis', 'Printemps, tous les 2-3 ans');

-- ============================================
-- TOXICITÉ
-- ============================================

INSERT INTO toxicity_infos (plant_id, toxic_to_humans, human_toxicity_detail, toxic_to_dogs, dog_toxicity_detail, toxic_to_cats, cat_toxicity_detail, toxic_parts)
VALUES
(1, true, 'Irritant si ingéré, contient des cristaux d''oxalate de calcium', true, 'Toxique, provoque irritation buccale et vomissements', true, 'Toxique, provoque irritation buccale et vomissements', 'Feuilles et tiges'),
(2, false, 'Non toxique pour les humains', false, 'Non toxique pour les chiens', false, 'Non toxique pour les chats', 'Aucune'),
(3, false, 'Non toxique pour les humains', false, 'Non toxique pour les chiens', false, 'Non toxique pour les chats', 'Aucune'),
(4, true, 'Sève irritante pour la peau et les muqueuses', true, 'Toxique, irritation buccale', true, 'Toxique, irritation buccale', 'Sève'),
(5, false, 'Le gel est comestible, mais le latex jaune sous la peau peut irriter', true, 'Toxique, peut causer vomissements et diarrhée', true, 'Toxique, peut causer vomissements et diarrhée', 'Latex (partie jaune sous la peau)'),
(6, false, 'Non toxique pour les humains', false, 'Non toxique pour les chiens', false, 'Non toxique pour les chats', 'Aucune'),
(7, true, 'Toxique, contient des cristaux d''oxalate de calcium irritants', true, 'Toxique, irritation buccale et digestive', true, 'Toxique, irritation buccale et digestive', 'Toutes les parties'),
(8, false, 'Non toxique pour les humains', false, 'Non toxique pour les chiens', false, 'Non toxique pour les chats', 'Aucune'),
(9, false, 'Non toxique pour les humains', false, 'Non toxique pour les chiens', false, 'Non toxique pour les chats', 'Aucune'),
(10, true, 'Très irritant, sève toxique pour la bouche et la gorge', true, 'Toxique, peut causer un gonflement de la gorge', true, 'Toxique, peut causer un gonflement de la gorge', 'Toutes les parties, surtout la sève'),
(11, false, 'Non toxique pour les humains', false, 'Non toxique pour les chiens', false, 'Non toxique pour les chats', 'Aucune'),
(12, true, 'Toxique, contient des glycosides cardiaques dangereux', true, 'Très toxique, risque cardiaque grave', true, 'Très toxique, risque cardiaque grave', 'Toutes les parties, y compris les fleurs'),
(13, false, 'Non toxique pour les humains', false, 'Non toxique pour les chiens', false, 'Non toxique pour les chats', 'Aucune'),
(14, true, 'Contient des cristaux d''oxalate de calcium irritants', true, 'Toxique, irritation buccale', true, 'Toxique, irritation buccale', 'Toutes les parties'),
(15, false, 'Non toxique pour les humains', false, 'Non toxique pour les chiens', false, 'Non toxique pour les chats', 'Aucune');