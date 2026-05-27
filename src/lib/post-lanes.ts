export const POST_LANES = [
  "automation-lab",
  "reporters-notebook",
  "portfolio",
] as const;

export type PostLane = (typeof POST_LANES)[number];

export const DEFAULT_POST_LANE: PostLane = "automation-lab";

export const ARTIFACT_TYPES = [
  "template",
  "script",
  "checklist",
  "research-note",
  "source-map",
  "case-study",
] as const;

export type ArtifactType = (typeof ARTIFACT_TYPES)[number];

export function normalizePostLane(value: unknown): PostLane {
  return POST_LANES.includes(value as PostLane)
    ? (value as PostLane)
    : DEFAULT_POST_LANE;
}

export function normalizeArtifactType(value: unknown): ArtifactType | undefined {
  return ARTIFACT_TYPES.includes(value as ArtifactType)
    ? (value as ArtifactType)
    : undefined;
}

export function getLaneLabel(lane: PostLane): string {
  switch (lane) {
    case "reporters-notebook":
      return "Reporter's Notebook";
    case "portfolio":
      return "Portfolio";
    case "automation-lab":
    default:
      return "Automation Lab";
  }
}

export function getArtifactLabel(artifactType: ArtifactType): string {
  switch (artifactType) {
    case "research-note":
      return "Research note";
    case "source-map":
      return "Source map";
    case "case-study":
      return "Case study";
    default:
      return artifactType.charAt(0).toUpperCase() + artifactType.slice(1);
  }
}
