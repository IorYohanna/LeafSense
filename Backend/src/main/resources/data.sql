-- ============================================
-- PLANTES (avec champs Explorer)
-- ============================================

INSERT INTO plants (scientific_name, common_name, description, height_range, spread_range, leaf_type, planting_season, difficulty_level, resistance_level, maintenance_level, temperature_range, hardiness_zone, usages, adaptation_strategies, history_legend, name_history, symbolism)
VALUES
('Monstera deliciosa', 'Monstera', 'Plante d''intérieur emblématique reconnaissable à ses grandes feuilles perforées.', '1 m à 3 m en intérieur', '1 m à 2 m', 'Feuilles persistantes perforées', 'Printemps', 'Facile', 'Élevé', 'Faible', '18 à 27°C', '10-12',
 'Très utilisée en décoration d''intérieur et dans les compositions florales tropicales.',
 'Dans son habitat naturel, la Monstera développe des trous dans ses feuilles pour laisser passer la lumière et résister au vent des sous-bois tropicaux.',
 'Originaire des forêts tropicales du Mexique et d''Amérique centrale, elle grimpait autrefois le long des grands arbres à l''aide de racines aériennes.',
 'Son nom vient du latin "monstrosus" (monstrueux), en référence à ses feuilles étranges et perforées.',
 'Symbole de croissance personnelle et d''abondance dans de nombreuses cultures modernes.'),

('Maranta leuconeura', 'Plante prière', 'Plante décorative dont les feuilles se replient le soir comme des mains en prière.', '30 cm à 40 cm', '30 cm à 40 cm', 'Feuilles persistantes marbrées', 'Printemps', 'Modéré', 'Faible', 'Élevé', '18 à 24°C', '11-12',
 'Principalement ornementale, appréciée pour son feuillage marbré unique.',
 'Ses feuilles se replient la nuit (nyctinastie) pour réduire la perte d''eau et capter un maximum de lumière le jour.',
 'Découverte au Brésil, elle doit son nom au botaniste italien Bartolomeo Maranta.',
 'Le nom "Prière" vient du mouvement de ses feuilles le soir, rappelant des mains jointes.',
 'Associée à la protection et à la sérénité dans la décoration intérieure.'),

('Pilea peperomioides', 'Plante à monnaie chinoise', 'Petite plante ronde très tendance, facile à bouturer et à partager.', '20 cm à 40 cm', '20 cm à 30 cm', 'Feuilles persistantes rondes', 'Printemps', 'Facile', 'Moyen', 'Faible', '15 à 24°C', '10-11',
 'Populaire pour être échangée entre amis sous forme de boutures, symbole de partage.',
 'Produit facilement des rejets à sa base, une stratégie de reproduction végétative rapide.',
 'Rapportée de Chine par un missionnaire norvégien dans les années 1940, elle s''est répandue en Europe par échange entre particuliers plutôt que par le commerce.',
 'Son nom vient de la forme ronde de ses feuilles, rappelant des pièces de monnaie chinoises.',
 'Symbole de prospérité et de chance, souvent offerte en cadeau.'),

('Ficus elastica', 'Figuier caoutchouc', 'Grande plante d''intérieur au feuillage épais et brillant, facile à vivre.', '1 m à 3 m en intérieur', '60 cm à 1.5 m', 'Feuilles persistantes épaisses', 'Printemps', 'Facile', 'Élevé', 'Faible', '16 à 29°C', '10-11',
 'Sa sève a historiquement servi à produire du caoutchouc naturel avant l''hévéa.',
 'Ses feuilles épaisses et cireuses limitent la perte d''eau dans son environnement tropical d''origine.',
 'Originaire d''Asie du Sud, il était autrefois cultivé pour l''extraction de latex avant d''être supplanté par l''hévéa brésilien.',
 'Le nom "elastica" fait directement référence à l''élasticité de son latex.',
 'Symbole de prospérité et de résilience en Feng Shui.'),

('Aloe vera', 'Aloe vera', 'Succulente aux propriétés apaisantes, très facile d''entretien, adore le plein soleil.', '30 cm à 60 cm', '30 cm à 60 cm', 'Feuilles persistantes charnues', 'Printemps, Été', 'Facile', 'Élevé', 'Très faible', '13 à 27°C', '9-11',
 'Le gel est largement utilisé en cosmétique et en soins apaisants pour la peau après exposition au soleil.',
 'Stocke l''eau dans ses feuilles charnues pour survivre à de longues périodes de sécheresse.',
 'Utilisée depuis l''Égypte antique, où elle était surnommée "la plante de l''immortalité" et offerte aux pharaons défunts.',
 'Le nom "Aloe" viendrait de l''arabe "alloeh", signifiant substance amère et brillante.',
 'Symbole de guérison et de longévité à travers de nombreuses cultures.'),

('Calathea lancifolia', 'Calathea', 'Plante ornementale au feuillage très décoratif, nécessite une bonne humidité ambiante.', '40 cm à 70 cm', '30 cm à 50 cm', 'Feuilles persistantes rayées', 'Printemps', 'Modéré', 'Faible', 'Élevé', '18 à 26°C', '10-12',
 'Uniquement ornementale, prisée pour son feuillage rayé très graphique.',
 'Comme la Maranta, ses feuilles bougent au cours de la journée pour suivre la lumière et se replient la nuit.',
 'Originaire des forêts tropicales du Brésil, elle pousse naturellement au sol, à l''ombre de la canopée.',
 'Le nom "Calathea" vient du grec "kalathos", signifiant panier, en référence à l''usage historique de feuilles similaires pour le tissage.',
 'Associée à l''équilibre et l''harmonie dans la décoration intérieure moderne.'),

('Zamioculcas zamiifolia', 'Zamioculcas / Plante ZZ', 'Plante extrêmement résistante, tolère la négligence et la faible lumière.', '45 cm à 90 cm', '45 cm à 60 cm', 'Feuilles persistantes brillantes', 'Toute l''année', 'Facile', 'Très élevé', 'Très faible', '18 à 26°C', '9-11',
 'Très appréciée en bureaux et espaces peu lumineux pour sa résistance exceptionnelle.',
 'Stocke l''eau et les nutriments dans des rhizomes souterrains, lui permettant de survivre à de longues périodes de négligence.',
 'Originaire d''Afrique de l''Est, elle a été popularisée commercialement dans les années 1990 comme plante d''intérieur increvable.',
 'Le nom vient de sa ressemblance avec le genre Zamia, une plante cycadale.',
 'Symbole de longévité et de facilité de vie moderne.'),

('Schlumbergera bridgesii', 'Cactus de Noël', 'Cactus d''intérieur qui fleurit en hiver, contrairement aux cactus classiques il aime l''humidité.', '30 cm à 50 cm', '30 cm à 60 cm', 'Tiges segmentées charnues', 'Automne', 'Modéré', 'Moyen', 'Moyen', '18 à 24°C', '10-12',
 'Plante ornementale de saison, très populaire comme cadeau de Noël en Europe et Amérique du Nord.',
 'Contrairement aux cactus du désert, il pousse en épiphyte sur les arbres des forêts tropicales brésiliennes, d''où son besoin d''humidité.',
 'Découvert au Brésil au XIXe siècle et nommé en l''honneur du collectionneur Frédéric Schlumberger.',
 'Le nom commun "Cactus de Noël" vient de sa floraison hivernale spectaculaire.',
 'Symbole de renouveau et de fêtes de fin d''année.'),

('Saintpaulia ionantha', 'Violette africaine', 'Petite plante à fleurs, sensible à l''excès d''eau sur les feuilles.', '10 cm à 20 cm', '15 cm à 30 cm', 'Feuilles persistantes duveteuses', 'Toute l''année', 'Modéré', 'Faible', 'Élevé', '18 à 24°C', '11-12',
 'Plante à fleurs très populaire pour la décoration intérieure toute l''année.',
 'Ses feuilles duveteuses limitent l''évaporation et protègent des variations de température dans son habitat montagnard.',
 'Découverte en Tanzanie en 1892 par le baron Walter von Saint Paul, qui lui a donné son nom.',
 'Le nom "ionantha" vient du grec signifiant "fleur violette", en référence à sa couleur caractéristique.',
 'Symbole de loyauté et de dévotion discrète.'),

('Dieffenbachia seguine', 'Dieffenbachia', 'Grande plante d''intérieur au feuillage panaché, sève irritante.', '60 cm à 1.8 m', '45 cm à 90 cm', 'Feuilles persistantes panachées', 'Printemps', 'Facile', 'Moyen', 'Faible', '18 à 27°C', '10-12',
 'Principalement décorative en intérieur pour son feuillage panaché spectaculaire.',
 'Sa sève irritante et toxique constitue une défense naturelle contre les herbivores dans son habitat tropical.',
 'Originaire d''Amérique du Sud, son surnom anglais "Dumb cane" (canne muette) vient de l''effet paralysant de sa sève sur les cordes vocales si mâchée.',
 'Nommée en l''honneur de Joseph Dieffenbach, jardinier en chef du palais de Schönbrunn à Vienne.',
 'Associée historiquement à la prudence en raison de sa toxicité.'),

('Nephrolepis exaltata', 'Fougère de Boston', 'Fougère retombante appréciant l''humidité, feuillage léger et abondant.', '60 cm à 90 cm', '60 cm à 90 cm', 'Feuilles persistantes en frondes', 'Printemps', 'Modéré', 'Moyen', 'Élevé', '16 à 24°C', '9-11',
 'Très utilisée pour purifier l''air intérieur et en décoration suspendue.',
 'Ses frondes légères et nombreuses maximisent la capture de lumière dans les sous-bois humides.',
 'Popularisée à Boston à la fin du XIXe siècle après la découverte d''une mutation naturelle plus touffue de la fougère épée.',
 'Le nom "Boston" vient de la ville où cette variété particulière a été cultivée et diffusée pour la première fois.',
 'Symbole de sincérité et de fascination dans le langage des plantes victorien.'),

('Convallaria majalis', 'Muguet', 'Petite plante à fleurs blanches parfumées, pousse en sous-bois, fleurit au printemps.', '15 cm à 30 cm', '20 cm à 40 cm', 'Feuilles caduques lancéolées', 'Automne', 'Facile', 'Élevé', 'Faible', '-10 à 24°C', '3-8',
 'Traditionnellement offert le 1er mai en France comme porte-bonheur.',
 'Pousse en colonies denses par rhizomes sous la canopée forestière, profitant de la lumière printanière avant que les arbres ne se couvrent de feuilles.',
 'Associé depuis des siècles au retour du printemps, offert en France depuis la Renaissance comme symbole de bonheur.',
 'Le nom "majalis" signifie "qui fleurit en mai" en latin.',
 'Symbole du retour du bonheur et du printemps.'),

('Crassula ovata', 'Arbre de jade', 'Succulente populaire au tronc ligneux, symbole de chance et de prospérité.', '30 cm à 1 m', '30 cm à 60 cm', 'Feuilles persistantes charnues', 'Printemps, Été', 'Facile', 'Élevé', 'Faible', '10 à 35°C', '9-11',
 'Très populaire en bonsaï et comme plante porte-bonheur dans les commerces.',
 'Ses feuilles charnues stockent l''eau, une adaptation typique des régions arides d''Afrique du Sud dont elle est originaire.',
 'Originaire d''Afrique du Sud, elle est cultivée depuis des siècles pour sa robustesse exceptionnelle.',
 'Le nom "Arbre de jade" vient de la couleur verte brillante de ses feuilles, rappelant la pierre précieuse.',
 'Symbole de prospérité financière très répandu en Feng Shui, notamment dans les commerces.'),

('Anthurium andraeanum', 'Anthurium', 'Plante à fleurs colorées en forme de cœur, apprécie la chaleur et l''humidité.', '30 cm à 60 cm', '30 cm à 45 cm', 'Feuilles persistantes brillantes', 'Toute l''année', 'Modéré', 'Moyen', 'Moyen', '18 à 27°C', '11-12',
 'Très utilisée en fleuristerie pour ses spathes colorées durables.',
 'Ses racines aériennes lui permettent de s''accrocher aux arbres dans son habitat tropical humide en tant qu''épiphyte.',
 'Découverte en Colombie au XIXe siècle par l''explorateur français Édouard André, qui lui a donné son nom.',
 'Le nom "Anthurium" vient du grec "anthos" (fleur) et "oura" (queue), en référence à son spadice.',
 'Symbole d''hospitalité et de bonheur dans plusieurs cultures d''Amérique latine.'),

('Chamaedorea elegans', 'Palmier nain', 'Petit palmier d''intérieur, tolère la faible luminosité, facile à vivre.', '60 cm à 1.8 m', '60 cm à 1 m', 'Feuilles persistantes pennées', 'Printemps', 'Facile', 'Élevé', 'Faible', '18 à 26°C', '10-12',
 'Très utilisé en décoration intérieure et dans les compositions tropicales miniatures.',
 'Sa petite taille et sa tolérance à l''ombre sont des adaptations au sous-bois dense des forêts tropicales mexicaines.',
 'Originaire des forêts humides du Mexique et d''Amérique centrale, il était déjà cultivé en intérieur à l''époque victorienne.',
 'Le nom "Chamaedorea" vient du grec signifiant "cadeau à terre", en référence à sa petite taille par rapport aux autres palmiers.',
 'Symbole de victoire et de paix, associé historiquement à la feuille de palmier.');

-- ============================================
-- FICHES DE SOINS (avec avantages)
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

INSERT INTO care_advantages (care_instruction_id, advantage) VALUES
(1, 'Purifie l''air'), (1, 'Croissance rapide'), (1, 'Facile à bouturer'),
(2, 'Feuillage décoratif unique'), (2, 'Compacte, idéale petits espaces'),
(3, 'Facile à multiplier'), (3, 'Idéale à offrir'),
(4, 'Purifie l''air'), (4, 'Résistante et robuste'),
(5, 'Propriétés apaisantes'), (5, 'Résiste à la sécheresse'), (5, 'Très faible entretien'),
(6, 'Feuillage très graphique'), (6, 'Non toxique'),
(7, 'Tolère l''oubli d''arrosage'), (7, 'Pousse en faible lumière'), (7, 'Quasi indestructible'),
(8, 'Floraison hivernale'), (8, 'Non toxique'), (8, 'Longévité exceptionnelle'),
(9, 'Floraison toute l''année'), (9, 'Compacte'),
(10, 'Feuillage panaché spectaculaire'), (10, 'Croissance rapide'),
(11, 'Purifie l''air'), (11, 'Feuillage abondant'),
(12, 'Parfum agréable'), (12, 'Résistante au froid'), (12, 'Rustique en extérieur'),
(13, 'Résiste à la sécheresse'), (13, 'Non toxique'), (13, 'Facile à bouturer'),
(14, 'Floraison longue durée'), (14, 'Couleurs vives'),
(15, 'Pousse en faible lumière'), (15, 'Purifie l''air'), (15, 'Non toxique');

-- ============================================
-- TOXICITÉ (détaillée par cible)
-- ============================================

INSERT INTO toxicity_infos (plant_id, toxic_to_humans, human_toxic_if, human_toxic_parts, human_toxicity_detail, toxic_to_dogs, dog_toxic_if, dog_toxic_parts, dog_toxicity_detail, toxic_to_cats, cat_toxic_if, cat_toxic_parts, cat_toxicity_detail)
VALUES
(1, true, 'Ingéré ou en cas de contact avec la sève', 'Feuilles et tiges', 'Irritant si ingéré, contient des cristaux d''oxalate de calcium provoquant une sensation de brûlure buccale.', true, 'Ingéré', 'Feuilles et tiges', 'Toxique, provoque irritation buccale, vomissements et hypersalivation.', true, 'Ingéré', 'Feuilles et tiges', 'Toxique, provoque irritation buccale et vomissements.'),
(2, false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les humains, aucune précaution particulière requise.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chiens.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chats.'),
(3, false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les humains.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chiens.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chats.'),
(4, true, 'Contact cutané ou ingestion de la sève', 'Sève', 'Sève irritante pour la peau et les muqueuses, peut provoquer des réactions allergiques.', true, 'Ingéré', 'Sève', 'Toxique, irritation buccale et digestive possible.', true, 'Ingéré', 'Sève', 'Toxique, irritation buccale possible.'),
(5, false, 'Ingestion excessive du latex jaune', 'Latex (partie jaune sous la peau)', 'Le gel est comestible, mais le latex jaune sous la peau peut irriter en grande quantité.', true, 'Ingéré', 'Latex et feuilles', 'Toxique, peut causer vomissements et diarrhée.', true, 'Ingéré', 'Latex et feuilles', 'Toxique, peut causer vomissements et diarrhée.'),
(6, false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les humains.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chiens.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chats.'),
(7, true, 'Ingéré ou contact prolongé avec la sève', 'Toutes les parties', 'Toxique, contient des cristaux d''oxalate de calcium irritants pour la bouche et la peau.', true, 'Ingéré', 'Toutes les parties', 'Toxique, irritation buccale et digestive.', true, 'Ingéré', 'Toutes les parties', 'Toxique, irritation buccale et digestive.'),
(8, false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les humains.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chiens.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chats.'),
(9, false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les humains.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chiens.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chats.'),
(10, true, 'Mâché ou ingéré', 'Toutes les parties, surtout la sève', 'Très irritant, sève toxique pouvant provoquer un gonflement de la gorge et une perte temporaire de la voix.', true, 'Ingéré', 'Toutes les parties', 'Toxique, peut causer un gonflement de la gorge et des difficultés respiratoires.', true, 'Ingéré', 'Toutes les parties', 'Toxique, peut causer un gonflement de la gorge.'),
(11, false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les humains.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chiens.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chats.'),
(12, true, 'Ingéré, même en petite quantité', 'Toutes les parties, y compris les fleurs et l''eau du vase', 'Toxique, contient des glycosides cardiaques pouvant provoquer des troubles cardiaques graves.', true, 'Ingéré', 'Toutes les parties', 'Très toxique, risque cardiaque grave, consultation vétérinaire urgente recommandée.', true, 'Ingéré', 'Toutes les parties', 'Très toxique, risque cardiaque grave.'),
(13, false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les humains.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chiens.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chats.'),
(14, true, 'Ingéré ou contact avec la sève', 'Toutes les parties', 'Contient des cristaux d''oxalate de calcium irritants pour la bouche et la peau.', true, 'Ingéré', 'Toutes les parties', 'Toxique, irritation buccale.', true, 'Ingéré', 'Toutes les parties', 'Toxique, irritation buccale.'),
(15, false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les humains.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chiens.', false, 'Aucun cas connu', 'Aucune', 'Non toxique pour les chats.');

-- ============================================
-- PROBLÈMES COURANTS (2 par plante, images réelles)
-- ============================================

INSERT INTO common_problems (plant_id, title, description, image_url)
VALUES
(1, 'Jaunissement des feuilles', 'Souvent causé par un excès d''arrosage ou un sol mal drainé.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Monstera_deliciosa2.jpg/640px-Monstera_deliciosa2.jpg'),
(1, 'Absence de fenestration', 'Les jeunes feuilles sans trous indiquent un manque de lumière ou de maturité de la plante.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monstera_deliciosa_leaf.jpg/640px-Monstera_deliciosa_leaf.jpg'),

(2, 'Bords de feuilles secs', 'Provoqué par un air trop sec ou une eau trop calcaire.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Maranta_leuconeura2.jpg/640px-Maranta_leuconeura2.jpg'),
(2, 'Feuilles qui ne se replient plus le soir', 'Signe de stress hydrique ou de manque de lumière.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Maranta_leuconeura_kerchoveana.jpg/640px-Maranta_leuconeura_kerchoveana.jpg'),

(3, 'Chute des feuilles du bas', 'Naturel avec l''âge, mais accéléré par un manque de lumière.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pilea_peperomioides2.jpg/640px-Pilea_peperomioides2.jpg'),
(3, 'Taches blanches sur les feuilles', 'Dépôt de calcaire dû à une eau d''arrosage trop dure.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Pilea_peperomioides_leaves.jpg/640px-Pilea_peperomioides_leaves.jpg'),

(4, 'Chute des feuilles', 'Généralement causée par un changement brutal de température ou de luminosité.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Ficus_elastica2.jpg/640px-Ficus_elastica2.jpg'),
(4, 'Feuilles ternes et poussiéreuses', 'Nécessite un nettoyage régulier des feuilles pour la photosynthèse.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ficus_elastica_leaf.jpg/640px-Ficus_elastica_leaf.jpg'),

(5, 'Feuilles molles et affaissées', 'Signe fréquent de sur-arrosage chez les succulentes.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Aloe_vera_flower_inset.png/640px-Aloe_vera_flower_inset.png'),
(5, 'Pointes brunes et sèches', 'Souvent lié à un manque d''eau prolongé ou à un excès de soleil direct.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Aloe_vera_leaf.jpg/640px-Aloe_vera_leaf.jpg'),

(6, 'Bords de feuilles qui craquellent', 'Causé par un air ambiant trop sec, besoin de vaporiser régulièrement.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Calathea_lancifolia1.jpg/640px-Calathea_lancifolia1.jpg'),
(6, 'Enroulement des feuilles', 'Signe de stress hydrique ou d''exposition à un courant d''air froid.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Calathea_lancifolia2.jpg/640px-Calathea_lancifolia2.jpg'),

(7, 'Jaunissement des tiges', 'Signe classique de sur-arrosage, à corriger rapidement pour éviter la pourriture.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Zamioculcas_zamiifolia2.jpg/640px-Zamioculcas_zamiifolia2.jpg'),
(7, 'Croissance très lente', 'Comportement normal de l''espèce, ne pas confondre avec un problème de santé.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Zamioculcas_zamiifolia1.jpg/640px-Zamioculcas_zamiifolia1.jpg'),

(8, 'Absence de floraison', 'Nécessite une période de repos au frais et à l''obscurité avant l''automne.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Schlumbergera_truncata2.jpg/640px-Schlumbergera_truncata2.jpg'),
(8, 'Chute des segments', 'Souvent due à un stress lié à un déplacement ou un changement de lumière.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Schlumbergera_bridgesii.jpg/640px-Schlumbergera_bridgesii.jpg'),

(9, 'Taches sur les feuilles', 'Provoquées par des gouttes d''eau froide sur le feuillage duveteux.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Saintpaulia_ionantha2.jpg/640px-Saintpaulia_ionantha2.jpg'),
(9, 'Absence de floraison', 'Souvent liée à un manque de lumière ou un pot trop grand.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Saintpaulia_ionantha1.jpg/640px-Saintpaulia_ionantha1.jpg'),

(10, 'Feuilles jaunes à la base', 'Signe naturel de vieillissement, ou d''un excès d''arrosage.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Dieffenbachia_seguine2.jpg/640px-Dieffenbachia_seguine2.jpg'),
(10, 'Taches brunes sur les feuilles', 'Peut indiquer un excès de soleil direct ou une carence en nutriments.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Dieffenbachia_seguine_leaf.jpg/640px-Dieffenbachia_seguine_leaf.jpg'),

(11, 'Frondes qui brunissent et sèchent', 'Signe d''air trop sec, nécessite une humidité ambiante élevée.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Nephrolepis_exaltata2.jpg/640px-Nephrolepis_exaltata2.jpg'),
(11, 'Chute des folioles', 'Provoquée par un manque d''arrosage ou un emplacement trop lumineux.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Nephrolepis_exaltata_bostoniensis.jpg/640px-Nephrolepis_exaltata_bostoniensis.jpg'),

(12, 'Absence de floraison au printemps', 'Nécessite une période de froid hivernal pour déclencher la floraison.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Convallaria_majalis2.jpg/640px-Convallaria_majalis2.jpg'),
(12, 'Feuillage qui jaunit en été', 'Comportement naturel de dormance estivale de la plante.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Convallaria_majalis1.jpg/640px-Convallaria_majalis1.jpg'),

(13, 'Chute des feuilles', 'Généralement causée par un excès d''arrosage ou un choc de température.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Crassula_ovata2.jpg/640px-Crassula_ovata2.jpg'),
(13, 'Feuilles ridées', 'Signe de manque d''eau prolongé, la plante puise dans ses réserves.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Crassula_ovata_leaves.jpg/640px-Crassula_ovata_leaves.jpg'),

(14, 'Absence de floraison', 'Souvent liée à un manque de lumière ou un excès d''engrais azoté.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Anthurium_andraeanum2.jpg/640px-Anthurium_andraeanum2.jpg'),
(14, 'Taches noires sur les fleurs', 'Peut indiquer un excès d''humidité stagnante sur le feuillage.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Anthurium_andraeanum1.jpg/640px-Anthurium_andraeanum1.jpg'),

(15, 'Pointes de feuilles brunes', 'Causé par un air trop sec ou une eau d''arrosage trop calcaire.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Chamaedorea_elegans2.jpg/640px-Chamaedorea_elegans2.jpg'),
(15, 'Croissance jaunâtre et chétive', 'Signe d''un manque de lumière ou de nutriments dans le terreau.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Chamaedorea_elegans1.jpg/640px-Chamaedorea_elegans1.jpg');