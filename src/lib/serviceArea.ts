/**
 * Static East-TN service area. ~90-minute drive from downtown Knoxville.
 *
 * Curated set of ZIP codes covering Knox + the major surrounding counties.
 * Replace with a live Mapbox isochrone lookup once NEXT_PUBLIC_MAPBOX_TOKEN is set
 * (planned for the Week 8 follow-up once Faiz drops keys).
 */

export const SERVICE_AREA_ZIPS = new Set<string>([
  // Knox County
  "37902", "37909", "37912", "37914", "37915", "37916", "37917", "37918",
  "37919", "37920", "37921", "37922", "37923", "37924", "37927", "37928",
  "37929", "37930", "37931", "37932", "37933", "37934", "37938", "37939",
  // Blount County (Maryville, Alcoa)
  "37701", "37737", "37742", "37777", "37801", "37802", "37803", "37804",
  // Sevier County (Sevierville, Pigeon Forge, Gatlinburg)
  "37738", "37862", "37863", "37864", "37865", "37868", "37876", "37882",
  // Anderson County (Oak Ridge, Clinton, Norris)
  "37710", "37716", "37717", "37769", "37828", "37830", "37831",
  // Loudon County (Loudon, Lenoir City, Tellico Village)
  "37771", "37772", "37774",
  // Roane County (Harriman, Kingston)
  "37748", "37763", "37840", "37854",
  // Monroe County (Madisonville, Tellico Plains)
  "37354", "37385",
  // Cocke County (Newport)
  "37722", "37821", "37843",
  // Jefferson County (Dandridge, Jefferson City, Strawberry Plains)
  "37725", "37760", "37820", "37871",
  // Grainger County (Bean Station, Rutledge)
  "37708", "37711", "37861",
  // Union County (Maynardville)
  "37779", "37807", "37866",
  // Campbell County (Caryville, Jacksboro, LaFollette)
  "37714", "37755", "37757", "37766", "37819", "37852",
  // Morgan County (Wartburg)
  "37840", "37841", "37887",
  // Cumberland County (Crossville)
  "38555", "38556", "38557", "38558", "38571", "38572",
]);

export type ServiceAreaCheck = {
  zip: string;
  inServiceArea: boolean;
};

export function normalizeZip(input: string): string {
  return input.replace(/[^\d]/g, "").slice(0, 5);
}

export function isInServiceArea(zip: string): boolean {
  return SERVICE_AREA_ZIPS.has(normalizeZip(zip));
}

export function checkServiceArea(zip: string): ServiceAreaCheck {
  const normalized = normalizeZip(zip);
  return { zip: normalized, inServiceArea: SERVICE_AREA_ZIPS.has(normalized) };
}
