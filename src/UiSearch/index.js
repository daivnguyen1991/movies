import { Fragment, useEffect } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import useSWR from "swr";

import { Box } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import Toolbar from "@mui/material/Toolbar";

import useStore, { fetcher, linkUrlSearchKeyword } from "../store";
import Wrapper from "../comps/Wrapper";
import UiLoading from "../comps/UiLoading";
import UiError from "../comps/UiError";
import UiNoData from "../comps/UiNoData";
import CardMovies from "../comps/CardMovies";
import BtnIcon from "../comps/BtnIcon";

import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";

const keyPage = "pageSearch";

function UiSearch() {
  const view = useStore((s) => s.view);
  const searchValue = useStore((s) => s.searchValue);
  const setView = useStore((s) => s.setView);
  const page = useStore((s) => s[keyPage]);
  const setPage = useStore((s) => s.setPage);

  const {
    data: { results, total_pages } = {},
    error,
    mutate,
  } = useSWR(linkUrlSearchKeyword(searchValue, page), fetcher);

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var lazyloadImages;

      if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function (
          entries,
          observer
        ) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              image.src = image.dataset.src;
              image.classList.remove("lazy");
              imageObserver.unobserve(image);
            }
          });
        });

        lazyloadImages.forEach(function (image) {
          imageObserver.observe(image);
        });
      } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
          if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
          }

          lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
              if (img.offsetTop < window.innerHeight + scrollTop) {
                img.src = img.dataset.src;
                img.classList.remove("lazy");
              }
            });
            if (lazyloadImages.length === 0) {
              document.removeEventListener("scroll", lazyload);
              window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
            }
          }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
      }
    });
  }, []);

  useEffect(
    () => () => {
      setPage(keyPage, 1);
    },
    [setPage]
  );
  return (
    <Fragment>
      {total_pages && (
        <Wrapper>
          <Toolbar>
            <BtnIcon
              view={view}
              init="grid"
              onClick={() => typeof setView === "function" && setView("grid")}
            >
              <GridViewIcon />
            </BtnIcon>
            <BtnIcon
              view={view}
              init="list"
              onClick={() => typeof setView === "function" && setView("list")}
            >
              <ListIcon />
            </BtnIcon>
            <Pagination
              siblingCount={0}
              count={total_pages}
              page={page}
              onChange={(e, page) =>
                typeof setPage === "function" && setPage(keyPage, page)
              }
              sx={{ ml: "auto" }}
            />
          </Toolbar>
        </Wrapper>
      )}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          "& > .container-refresh": {
            "& > :nth-of-type(2)": {
              overflow: "hidden scroll !important",
            },
          },
        }}
      >
        {error && <UiError />}
        {!results && <UiLoading />}
        {Array.isArray(results) && results.length === 0 && <UiNoData />}
        {Array.isArray(results) && results.length > 0 && (
          <PullToRefresh
            onRefresh={() => {
              return new Promise((resolve) => {
                mutate(linkUrlSearchKeyword(searchValue, page));
                resolve();
              });
            }}
            pullingContent="Refresh Data"
            refreshingContent={<UiLoading />}
            className="container-refresh"
          >
            <Wrapper>
              <Box
                sx={({ typography: { pxToRem }, breakpoints, palette }) => ({
                  display: "grid",
                  gap: pxToRem(12),
                  gridTemplateColumns:
                    view === "list"
                      ? "repeat(1,1fr)"
                      : [
                          "repeat(2,1fr)",
                          "repeat(3,1fr)",
                          "repeat(4,1fr)",
                          "repeat(5,1fr)",
                        ],
                  "& > .movies-container": {
                    maxWidth: "100%",
                    cursor: "pointer",
                    border: `1px solid ${palette.grey[300]}`,
                    ...(view === "list"
                      ? {
                          display: "flex",
                          img: {
                            width: "auto",
                          },
                        }
                      : {}),
                  },
                })}
              >
                {Array.isArray(results) &&
                  results.map((i) => <CardMovies key={i.id} {...i} />)}
              </Box>
            </Wrapper>
          </PullToRefresh>
        )}
      </Box>
    </Fragment>
  );
}

export default UiSearch;
