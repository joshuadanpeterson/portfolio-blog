"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Check, Copy, Mail, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  title: string;
  url: string;
};

export function PostShareMenu({ title, url }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const triggerWrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shareLinks = useMemo(() => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const emailBody = encodeURIComponent(`${title}\n\n${url}`);

    return {
      x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${emailBody}`,
    };
  }, [title, url]);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }

  async function copyLink(event: Event) {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  useEffect(() => {
    const triggerWrap = triggerWrapRef.current;

    if (!triggerWrap) {
      return;
    }

    triggerWrap.addEventListener("pointerover", openMenu);
    triggerWrap.addEventListener("mouseover", openMenu);
    triggerWrap.addEventListener("pointerleave", scheduleClose);
    triggerWrap.addEventListener("mouseleave", scheduleClose);

    return () => {
      triggerWrap.removeEventListener("pointerover", openMenu);
      triggerWrap.removeEventListener("mouseover", openMenu);
      triggerWrap.removeEventListener("pointerleave", scheduleClose);
      triggerWrap.removeEventListener("mouseleave", scheduleClose);
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    content.addEventListener("pointerover", openMenu);
    content.addEventListener("mouseover", openMenu);
    content.addEventListener("pointerleave", scheduleClose);
    content.addEventListener("mouseleave", scheduleClose);

    return () => {
      content.removeEventListener("pointerover", openMenu);
      content.removeEventListener("mouseover", openMenu);
      content.removeEventListener("pointerleave", scheduleClose);
      content.removeEventListener("mouseleave", scheduleClose);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div
        ref={triggerWrapRef}
        className="inline-flex"
      >
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 border-border/80 px-3 text-sm text-muted-foreground hover:text-foreground"
            aria-label="Share this post"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          ref={contentRef}
          align="end"
          className="z-[1000] w-52 bg-white dark:bg-popover"
        >
          <DropdownMenuItem asChild>
            <a
              href={shareLinks.x}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" />
              Post to X
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="h-4 w-4" />
              Share on LinkedIn
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
              Share on Facebook
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={shareLinks.email}>
              <Mail className="h-4 w-4" />
              Email link
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={copyLink}>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy link"}
          </DropdownMenuItem>
          <span className="sr-only" aria-live="polite">
            {copied ? "Post link copied" : ""}
          </span>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
